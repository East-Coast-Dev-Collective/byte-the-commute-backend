import app from "../app.js";

const server = app.listen(0);
await new Promise((resolve) => server.once("listening", resolve));
const baseUrl = `http://127.0.0.1:${server.address().port}`;

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const requestJson = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  const text = await res.text();
  let payload = null;
  try {
    payload = JSON.parse(text);
  } catch {
    payload = { raw: text };
  }
  return { status: res.status, payload };
};

try {
  let result = await requestJson("/api/weather");
  assert(result.status === 400, `Expected 400 for missing params, got ${result.status}`);

  result = await requestJson("/api/weather?lat=abc&lng=-77.00874");
  assert(result.status === 400, `Expected 400 for invalid lat, got ${result.status}`);

  result = await requestJson("/api/weather?lat=38.89006&lng=-77.00874");

  if (result.status === 500) {
    throw new Error(
      "OpenWeather API key is missing. Set OPEN_WEATHER_API_KEY or OPENWEATHER_API_KEY in .env"
    );
  }

  assert(result.status === 200, `Expected 200 for valid request, got ${result.status}`);
  assert(
    Object.hasOwn(result.payload, "temperature") &&
      Object.hasOwn(result.payload, "condition") &&
      Object.hasOwn(result.payload, "icon") &&
      Object.hasOwn(result.payload, "feelsLike"),
    "Expected response to include temperature, condition, icon, feelsLike"
  );

  console.log("PASS: /api/weather endpoint checks succeeded.");
} finally {
  server.close();
}

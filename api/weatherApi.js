const OPEN_WEATHER_API_KEY =
  process.env.OPEN_WEATHER_API_KEY ?? process.env.OPENWEATHER_API_KEY;

const WEATHER_CURRENT_API_BASE_URL =
  "https://api.openweathermap.org/data/2.5/weather";
const WEATHER_3HOUR_API_BASE_URL =
  "https://api.openweathermap.org/data/2.5/forecast";

const getWeather = async ({ lat, lon, apiUrl }) => {
  /*
  Parameters:
  lat (number): latitude, must be in range -90 to 90
  lon (number): longitude, must be in range -180 to 180
  apiUrl (string): The particular weather API URL to use. Determines
    whether the function returns current weather or the forecast

  Returns:
  object
  */

  if (lat == null || lon == null) {
    throw new Error("Missing required parameters: lat, lon");
  }
  if (
    typeof lat !== "number" ||
    typeof lon !== "number" ||
    !Number.isFinite(lat) ||
    !Number.isFinite(lon)
  ) {
    throw new Error("lat/lon must be numbers");
  }
  if (lat > 90 || lat < -90) {
    throw new Error("lat must be from -90 to 90");
  }
  if (lon > 180 || lon < -180) {
    throw new Error("lon must be from -180 to 180");
  }

  if (!OPEN_WEATHER_API_KEY) {
    throw new Error(
      "Missing OpenWeather API key. Set OPEN_WEATHER_API_KEY or OPENWEATHER_API_KEY"
    );
  }

  const params = new URLSearchParams();
  params.append("lat", lat);
  params.append("lon", lon);
  params.append("appid", OPEN_WEATHER_API_KEY);
  params.append("units", "imperial");

  try {
    const resp = await fetch(`${apiUrl}?${params}`);
    if (!resp.ok) {
      throw new Error(`HTTP error: Status: ${resp.status}`);
    }

    const respJson = await resp.json();
    return respJson;
  } catch (err) {
    console.error("Fetch in getWeather failed:", err);
    throw err;
  }
};

export const getCurrWeatherAll = async ({ lat, lon }) => {
  const weatherJson = await getWeather({
    lat,
    lon,
    apiUrl: WEATHER_CURRENT_API_BASE_URL,
  });
  return weatherJson;
};

export const getForecastWeatherAll = async ({ lat, lon }) => {
  const weatherJson = await getWeather({
    lat,
    lon,
    apiUrl: WEATHER_3HOUR_API_BASE_URL,
  });
  return weatherJson;
};

export const getCurrWeather = async ({ lat, lon }) => {
  const { main, weather } = await getCurrWeatherAll({ lat, lon });

  const currWeatherInfo = {
    currTemp: main.temp,
    currFeelsLike: main.feels_like,
    currHumidity: main.humidity,
    overview: weather,
  };
  return currWeatherInfo;
};

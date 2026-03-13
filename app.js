import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import routeRoutes from "./routes/routeRoutes.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: "https://69b3737d62eace4a17447e11--bytethecommute.netlify.app" }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/route", routeRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "success", message: "Server healthy!" });
});

app.get("/api/ping", (req, res) => {
  res.json({ status: "success", pong: true });
});

// Return current weather data from OpenWeather API
app.get("/api/weather", async (req, res) => {
  const { lat, lng } = req.query;

  if (lat == null || lng == null) {
    return res.status(400).json({ error: "lat and lng are required" });
  }

  const latNum = Number(lat);
  const lonNum = Number(lng);

  if (!Number.isFinite(latNum) || !Number.isFinite(lonNum)) {
    return res.status(400).json({ error: "lat and lng must be numbers" });
  }
  if (latNum > 90 || latNum < -90) {
    return res.status(400).json({ error: "lat must be from -90 to 90" });
  }
  if (lonNum > 180 || lonNum < -180) {
    return res.status(400).json({ error: "lng must be from -180 to 180" });
  }

  try {
    const weatherData = await getCurrWeatherAll({ lat: latNum, lon: lonNum });
    const primaryCondition = Array.isArray(weatherData?.weather)
      ? weatherData.weather[0]
      : null;

    return res.json({
      temperature: weatherData?.main?.temp ?? null,
      condition: primaryCondition?.main ?? null,
      icon: primaryCondition?.icon ?? null,
      feelsLike: weatherData?.main?.feels_like ?? null,
    });
  } catch (err) {
    if (String(err?.message).includes("Missing OpenWeather API key")) {
      return res.status(500).json({ error: "Missing OpenWeather API key" });
    }
    return res.status(502).json({ error: "Failed to fetch weather" });
  }
});

// Normalize Google Directions leg steps into a consistent itinerary payload for transit mode.
const buildTransitSteps = (leg) => {
  return (leg?.steps ?? [])
    .filter(
      (step) =>
        step?.travel_mode === "WALKING" || step?.travel_mode === "TRANSIT",
    )
    .map((step) => {
      const travelModeRaw = step?.travel_mode ?? null;
      const travelMode =
        travelModeRaw === "WALKING"
          ? "walking"
          : travelModeRaw === "TRANSIT"
            ? "transit"
            : null;

      const td = step?.transit_details ?? null;
      const line = td?.line ?? null;
      const agency = line?.agencies?.[0] ?? null;

      return {
        travelMode,
        vehicleType: td ? (line?.vehicle?.type ?? null) : null,
        lineName: td ? (line?.name ?? null) : null,
        lineShortName: td ? (line?.short_name ?? null) : null,
        agency: td ? (agency?.name ?? null) : null,
        headsign: td ? (td?.headsign ?? null) : null,
        departureStop: td ? (td?.departure_stop?.name ?? null) : null,
        arrivalStop: td ? (td?.arrival_stop?.name ?? null) : null,
        departureTime: td ? (td?.departure_time?.text ?? null) : null,
        arrivalTime: td ? (td?.arrival_time?.text ?? null) : null,
        numStops: td ? (td?.num_stops ?? null) : null,
        durationText:
          travelMode === "walking" ? (step?.duration?.text ?? null) : null,
        distanceText:
          travelMode === "walking" ? (step?.distance?.text ?? null) : null,
      };
    });
};

// Return real route data from Google Directions API
app.post("/api/route", async (req, res) => {
  const { from, to, mode = "drive" } = req.body;

  if (!from || !to) {
    return res.status(400).json({ error: "from and to are required" });
  }

  // Normalize safely so null/number/etc. never crashes
  const normalizedMode =
    mode == null ? "drive" : String(mode).toLowerCase().trim();

  const allowedModes = new Set(["drive", "transit", "walk", "bike"]);

  if (!allowedModes.has(normalizedMode)) {
    return res.status(400).json({
      error: "Invalid mode. Must be one of: drive, transit, walk, bike",
    });
  }

  // Map app values to Google Directions API mode values
  const modeMap = {
    drive: "driving",
    transit: "transit",
    walk: "walking",
    bike: "bicycling",
  };

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing GOOGLE_MAPS_API_KEY" });
  }

  const url = new URL("https://maps.googleapis.com/maps/api/directions/json");
  url.searchParams.set("origin", from);
  url.searchParams.set("destination", to);
  url.searchParams.set("mode", modeMap[normalizedMode]);
  url.searchParams.set("key", apiKey);

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK" || !data.routes?.length) {
      return res.status(400).json({ error: "No route found" });
    }

    const route = data.routes[0];
    const leg = route.legs[0];

    const transitSteps =
      normalizedMode === "transit" ? buildTransitSteps(leg) : undefined;

    return res.json({
      mode: normalizedMode,
      distanceText: leg.distance.text,
      durationText: leg.duration.text,
      polyline: route.overview_polyline.points,
      startLocation: {
        lat: leg.start_location.lat,
        lng: leg.start_location.lng,
      },
      endLocation: {
        lat: leg.end_location.lat,
        lng: leg.end_location.lng,
      },
      ...(normalizedMode === "transit" ? { transitSteps } : {}),
    });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});
// matches all routes that have not yet been matched -- catch-all
// should come after all other routes, but before error handling
app.use((req, res, next) => {
  res
    .status(404)
    .json({ status: "error", message: "Not Found Error: Unknown endpoint" });
});

// error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    status: "error",
    message: "Something has gone wrong on the backend server",
  });
});

export default app;


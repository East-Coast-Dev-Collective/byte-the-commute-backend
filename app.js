import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "success", message: "Server healthy!" });
});

app.get("/api/ping", (req, res) => {
  res.json({ status: "success", pong: true });
});

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

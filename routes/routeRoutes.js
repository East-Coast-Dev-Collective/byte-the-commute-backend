import express from "express";
import { getRouteFromGoogle } from "../api/routeApi.js";

const router = express.Router();

// Return real route data from Google Directions API
router.post("/", async (req, res) => {
  const { from, to, mode = "drive" } = req.body;

  if (!from || !to) {
    return res.status(400).json({ error: "from and to are required" });
  }

  const normalizedMode =
    mode == null ? "drive" : String(mode).toLowerCase().trim();

  const allowedModes = new Set(["drive", "transit", "walk", "bike"]);

  if (!allowedModes.has(normalizedMode)) {
    return res.status(400).json({
      error: "Invalid mode. Must be one of: drive, transit, walk, bike",
    });
  }

  try {
    const data = await getRouteFromGoogle({
      from,
      to,
      mode: normalizedMode,
    });

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
    if (String(err?.message).includes("Missing GOOGLE_MAPS_API_KEY")) {
      return res.status(500).json({ error: "Missing GOOGLE_MAPS_API_KEY" });
    }

    if (String(err?.message).includes("No route found")) {
      return res.status(400).json({ error: "No route found" });
    }

    return res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;

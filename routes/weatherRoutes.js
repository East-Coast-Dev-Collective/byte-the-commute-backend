import express from "express";
import { getCurrWeatherAll } from "../api/weatherApi.js";

const router = express.Router();

// Return current weather data from OpenWeather API
router.get("/", async (req, res) => {
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
    const weatherData = await getCurrWeatherAll({
      lat: latNum,
      lon: lonNum,
    });

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

export default router;

## Overview

Byte The Commute Backend is the API service for the Byte The Commute app. It currently exposes health, ping, weather, and route endpoints.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL (planned integration)

## How To Run Locally

1. Clone the repo.
2. Create `.env` in the repository root.
3. Run `npm install`.
4. Start backend with `npm run dev`.

## Environment Variables

Set these values in `.env`:

- `PORT`
- `DATABASE_URL`
- `JWT_SECRET`
- `GOOGLE_MAPS_API_KEY`
- `OPEN_WEATHER_API_KEY` (preferred)
- `OPENWEATHER_API_KEY` (legacy fallback supported)

## Endpoints

Current:

- `GET /api/health`
- `GET /api/ping`
- `GET /api/weather`
- `POST /api/route`

### GET /api/weather behavior

Query params:

- `lat` (required, number, range `-90..90`)
- `lng` (required, number, range `-180..180`)

Invalid requests return `400`.

Successful response fields:

- `temperature`
- `condition`
- `icon`
- `feelsLike`

Example request:

```text
GET /api/weather?lat=38.89006&lng=-77.00874
```

### POST /api/route mode behavior

Request body supports:

```json
{ "from": "...", "to": "...", "mode": "..." }
```

- `mode` is optional
- Default mode: `drive`
- Valid values: `drive`, `transit`, `walk`, `bike`
- Invalid mode returns `400`
- Mode mapping to Google Directions API:
  - `drive` -> `driving`
  - `transit` -> `transit`
  - `walk` -> `walking`
  - `bike` -> `bicycling`

## Scripts

- `dev`
- `start`
- `test:weather`
- `test:weather:endpoint`

## Notes

Weather data is fetched from OpenWeather. Route data is fetched from Google Directions API.

When moving to production, update CORS origin in `app.js`.

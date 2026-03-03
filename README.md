## Overview

Byte The Commute Backend is the API service for the Byte The Commute app. It currently exposes basic health and ping endpoints and is being built to support route and transit features.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL (planned integration)

## How To Run Locally (Placeholder)

This is a placeholder setup flow for local development.

1. Clone the repo down using the command: `git clone <url-from-green-code-button-above>`
2. Create the `.env` file by copying the dummy environment file and giving it the filename of `.env`. You can use this command (ensure you are in the repository's root directory):
   `cp renameme.env .env`
   Ensure that you use the `.env` file going forward.
3. Run `npm install`
4. You can test out the site by running: `npm run dev`
5. Test endpoints in browser or with `curl`

Some features are still placeholder and not fully implemented yet, but these are the expected local run steps.

## Environment Variables

You will need to replace the dummy values with real values in the `.env` file:

- `PORT`
- `DATABASE_URL`
- `JWT_SECRET`

## Endpoints

Current:

- `GET /health`
- `GET /api/ping`

### Planned

- `GET /api/routes`
- `GET /api/stops`
- `GET /api/departures`

## Folder Structure

- `api`
- `db`

## Scripts

- `dev`
- `start`

## Workflow

Create a feature branch, make focused changes, and open a pull request. Another team member reviews the PR, requests changes if needed, and approves before merge.

## Notes

GTFS (General Transit Feed Specification) is a common format for public transit schedules and route data. Transit agencies publish GTFS feeds so apps can consistently read trips, stops, and calendars. This backend will later ingest GTFS data to support routes, stops, and next departures.

For weather support, the backend will use each stop's latitude and longitude and call the Open-Meteo API. That response can be attached to stop or departure results to provide local weather context.

### Things that will need to change when moved to production

- The domain passed to CORS that allows cross-origin requests -- see app.js

Environment Setup

This project requires API keys for Google Maps and OpenWeather.

In the .env folder that will not be pushed to github repository,(added to gitignore file) update with the following variables:

GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
OPENWEATHER_API_KEY=your_openweather_api_key_here

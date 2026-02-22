## Overview

Byte The Commute Backend is the API service for the Byte The Commute app. It currently exposes basic health and ping endpoints and is being built to support route and transit features.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL (planned integration)

## How To Run Locally (Placeholder)

This is a placeholder setup flow for local development.

1. `npm install`
2. Create a `.env` file from `.env.example`
3. `npm run dev`
4. Test endpoints in browser or with `curl`

Some features are still placeholder and not fully implemented yet, but these are the expected local run steps.

## Environment Variables

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

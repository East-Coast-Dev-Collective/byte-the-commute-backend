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

export const getRouteFromGoogle = async ({ from, to, mode }) => {
  const modeMap = {
    drive: "driving",
    transit: "transit",
    walk: "walking",
    bike: "bicycling",
  };

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GOOGLE_MAPS_API_KEY");
  }

  const url = new URL("https://maps.googleapis.com/maps/api/directions/json");
  url.searchParams.set("origin", from);
  url.searchParams.set("destination", to);
  url.searchParams.set("mode", modeMap[mode]);
  url.searchParams.set("key", apiKey);

  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "OK" || !data.routes?.length) {
    throw new Error("No route found");
  }

  const route = data.routes[0];
  const leg = route.legs[0];
  const transitSteps = mode === "transit" ? buildTransitSteps(leg) : undefined;

  return {
    mode,
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
    ...(mode === "transit" ? { transitSteps } : {}),
  };
};

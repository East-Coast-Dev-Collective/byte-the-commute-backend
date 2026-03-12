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

  return data;
};

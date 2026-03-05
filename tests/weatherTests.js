import { getCurrWeather } from "../api/weatherApi.js";



const testCurrWeather = async () => {
  const dcWeather = await getCurrWeather({
    lat: 38.89006,
    lon: -77.00874,
  });
  console.log("weather forecast in DC: ", dcWeather);
};

await testCurrWeather();

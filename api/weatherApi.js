const OPEN_WEATHER_API_KEY=process.env.OPEN_WEATHER_API_KEY

const WEATHER_CURRENT_API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
const WEATHER_3HOUR_API_BASE_URL = "https://api.openweathermap.org/data/2.5/forecast"

// this is not used because the OpenWeather API errors for many of the icons currently
const WEATHER_ICON_BASE_URL = "https://openweathermap.org/payload/api/media/file"


const getWeather = async ({ lat, lon, apiUrl }) => {
  /*
  Parameters:
  lat (number): latitude, must be in range -90 to 90
  lon (number): longitude, must be in range -180 to 180
  apiUrl (string): The particular weather API URL to use. Determines
    weather the function returns current weather or the forecast

  The URL endpoint must have the following query parameters:
   'lat', 'lon', and 'appid'

  Returns:
  object
  */

  // validate lat and lon
  if (!lat || !lon) {
    throw new Error("Missing required parameters: lat, lon");
  }
  if (typeof lat !== "number" || typeof lon !== "number") {
    throw new Error("lat/lon must be numbers");
  }
  if (lat > 90 || lat < -90) {
    throw new Error("lat must be from -90 to 90");
  }
  if (lon > 180 || lon < -180) {
    throw new Error("lon must be from -180 to 180");
  }

  // add query parameters
  const params = new URLSearchParams();
  params.append("lat", lat);
  params.append("lon", lon);
  params.append("appid", OPEN_WEATHER_API_KEY);
  params.append("units", "imperial")

  try {
    const resp = await fetch(`${apiUrl}?${params}`);
    // check for HTTP error
    if (!resp.ok) {
      throw new Error(`HTTP error: Status: ${resp.status}`);
    }

    const respJson = await resp.json();
    return respJson;

  } catch (err) {
    console.error("Fetch in getCurrWeather failed: ", err);
    throw err;
  }

};


export const getCurrWeatherAll = async ({ lat, lon }) => {
  /*
  Parameters:
  lat (number): latitude, must be in range -90 to 90
  lon (number): longitude, must be in range -180 to 180

  The URL endpoint must have the following query parameters:
   'lat', 'lon', and 'appid'

  Returns:
  object
  */
  const weatherJson = await getWeather({
    lat: lat,
    lon: lon,
    apiUrl: WEATHER_CURRENT_API_BASE_URL
  });
  return weatherJson;
};


export const getForecastWeatherAll = async ({ lat, lon }) => {
  /*
  Parameters:
  lat (number): latitude, must be in range -90 to 90
  lon (number): longitude, must be in range -180 to 180

  The URL endpoint must have the following query parameters:
   'lat', 'lon', and 'appid'

  Returns:
  object
  */
  const weatherJson = await getWeather({
    lat: lat,
    lon: lon,
    apiUrl: WEATHER_3HOUR_API_BASE_URL
  });
  return weatherJson;
}


export const getCurrWeather = async ({ lat, lon }) => {
  /**
   * The weather condition codes are discussed here: https://openweathermap.org/weather-conditions
    
   Returns
   currWeatherInfo (object): has four keys: currTemp, currFeelsLike, currHumidity, and overview.
     overview is a list of objects, with the zero index item being the primary weather
     condition object that contains id, main, description, and icon for the current 
     weather condition
     
   See here for more info: https://openweathermap.org/current?collection=current_forecast
   */
  const { main, weather } = await getCurrWeatherAll({ lat: lat, lon: lon });

  const currWeatherInfo = {
    currTemp: main.temp,
    currFeelsLike: main.feels_like,
    currHumidity: main.humidity,
    overview: weather
  }
  return currWeatherInfo;
}



const testCurrWeather = async () => {
  const dcWeather = await getCurrWeather({
    lat: 38.89006,
    lon: -77.00874,
  });
  console.log("weather forecast in DC: ", dcWeather);
};

//await testCurrWeather();

const BASE_WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather?";
const WEATHER_APIKEY = "f761ad67b05c5ca0ed04db24872f297b";
const exclude = "minutely,daily,alert";
const units = "metric";

// let url =
//   BASE_WEATHER_API_URL +
//   `lat=${lat}&lon=${lon}&exclude=${exclude}&units${units}&appid=${WEATHER_APIKEY}`;

async function weather(lat, lon) {
  let response = await axios.get(
    BASE_WEATHER_API_URL +
      `lat=${lat}&lon=${lon}&exclude=${exclude}&units=${units}&appid=${WEATHER_APIKEY}`
  );

  return response.data;
}

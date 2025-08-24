import "dotenv/config";

/**
 * Fetches current weather data from OpenWeather API for given coordinates.
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<Object>} Weather data object
 * @throws {Error} If the API request fails
 */
export async function fetchCurrentWeather(latitude, longitude) {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${apiKey}`;
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

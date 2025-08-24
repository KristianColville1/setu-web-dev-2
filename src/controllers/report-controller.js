import { reportStore } from "../models/report-store.js";
import { stationStore } from "../models/station-store.js";
import { fetchCurrentWeather } from "../utils/openweather-api.js";

export const reportController = {
  /**
   * Adds a new report to a station using form data and redirects to the station view.
   */
  async addReport(request, response) {
    const stationID = request.params.id;
    // Helper function to check for empty string or undefined/null
    const getValueOrDefault = (value, defaultValue) =>
      value === undefined || value === null || value === "" ? defaultValue : value;

    const newReport = {
      code: getValueOrDefault(request.body.code, 200),
      temp: getValueOrDefault(request.body.temp, 0.0),
      windSpeed: getValueOrDefault(request.body.windSpeed, 0.0),
      windDirection: getValueOrDefault(request.body.windDirection, 0),
      pressure: getValueOrDefault(request.body.pressure, 0.0),
    };
    console.log(`Adding report for station ${stationID}`);
    await reportStore.addReport(stationID, newReport);
    response.redirect(`/station/${stationID}`);
  },

  /**
   * Deletes a report by ID from a station and redirects to the station view.
   */
  async deleteReport(request, response) {
    const stationID = request.params.stationid;
    const reportID = request.params.reportid;
    console.log(`Deleting Report ${reportID} from Station ${stationID}`);
    await reportStore.deleteReport(reportID);
    response.redirect("/station/" + stationID);
  },

  /**
   * Fetches weather data from an external API and auto-generates a report for a station.
   */
  async autoGenerateReport(request, response) {
    console.log("Auto generating report");
    const stationID = request.params.id;
    const station = await stationStore.getStationByID(stationID);
    try {
      const data = await fetchCurrentWeather(station.latitude, station.longitude);
      console.log("Weather data fetched successfully", data);
      const newReport = {
        code: data.current.weather[0].id,
        temp: Number((data.current.temp - 273.15).toFixed(2)), // Convert from Kelvin to Celsius
        windSpeed: data.current.wind_speed,
        windDirection: data.current.wind_deg,
        pressure: data.current.pressure,
      };
      await reportStore.addReport(stationID, newReport);
      response.redirect(`/station/${stationID}`);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      response.status(error.status || 500).send("Error fetching weather data");
      return;
    }
  }
};

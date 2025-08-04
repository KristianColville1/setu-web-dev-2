import { reportStore } from "../models/report-store.js";

export const reportController = {
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

  async deleteReport(request, response) {
    const stationID = request.params.stationid;
    const reportID = request.params.reportid;
    console.log(`Deleting Report ${reportID} from Station ${stationID}`);
    await reportStore.deleteReport(reportID);
    response.redirect("/station/" + stationID);
  },
};

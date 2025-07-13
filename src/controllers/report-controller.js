import { reportStore } from "../models/report-store.js";

export const reportController = {
  async addReport(request, response) {
    const stationID = request.params.id;
    const newReport = {
      code: request.body.code,
      temp: request.body.temp,
      windSpeed: request.body.windSpeed,
      windDirection: request.body.windDirection,
      pressure: request.body.pressure,
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

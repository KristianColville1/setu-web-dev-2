import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationByID(request.params.id);
    const viewData = {
      title: "Station Details",
      station: station,
    };
    response.render("station-view", viewData);
  },

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

};

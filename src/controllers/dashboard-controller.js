import { stationStore } from "../models/station-store.js";

export const dashboardController = {

  async index(request, response) {
    const viewData = {
      title: "WeatherTop Dashboard",
      stations: await stationStore.getAllStations(),
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },
};

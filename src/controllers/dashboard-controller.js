import { stationStore } from "../models/station-store.js";

export const dashboardController = {
  async index(request, response) {
    const viewData = {
      title: "WeatherTop",
    };
    console.log("home rendering");
    response.render("index", viewData);
  },

  async dashboard(request, response) {
    const viewData = {
      title: "WeatherTop Dashboard",
      stations: await stationStore.getAllStations(),
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },

  async addStation(request, response) {
    const newStation = {
      name: request.body.name,
    };
    console.log(`adding station ${newStation.name}`);
    await stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },

  async deleteStation(request, response) {
    const stationID = request.params.id;
    console.log(`Deleting Station ${stationID}`);
    await stationStore.deleteStationByID(stationID);
    response.redirect("/dashboard");
  },
};

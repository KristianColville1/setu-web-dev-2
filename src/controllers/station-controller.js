import { stationStore } from "../models/station-store.js";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationByID(request.params.id);
    const viewData = {
      title: "Station Details",
      station: station,
    };
    response.render("station-view", viewData);
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

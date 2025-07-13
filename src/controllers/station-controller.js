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
};

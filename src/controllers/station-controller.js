import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";

export const stationController = {
  /**
   * Renders the station details view for a given station ID.
   */
  async index(request, response) {
    const station = await stationStore.getStationByID(request.params.id);
    const viewData = {
      title: "Station Details",
      station: station,
    };
    response.render("station-view", viewData);
  },

  /**
   * Adds a new station for the authenticated user and redirects to dashboard.
   */
  async addStation(request, response) {
    const user = await accountsController.getAuthenticatedUser(request, response);
    if (!user) return;
    const newStation = {
      userId: user._id,
      name: request.body.name,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
    };
    console.log(`adding station ${newStation.name}`);
    await stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },

  /**
   * Deletes a station by ID for the authenticated user and redirects to dashboard.
   */
  async deleteStation(request, response) {
    const user = await accountsController.getAuthenticatedUser(request, response);
    if (!user) return;
    const stationID = request.params.id;
    console.log(`Deleting Station ${stationID}`);
    await stationStore.deleteStationByID(stationID);
    response.redirect("/dashboard");
  },
};

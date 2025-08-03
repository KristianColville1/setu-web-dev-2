import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";
export const dashboardController = {
  async index(request, response) {
    const user = await accountsController.getLoggedInUser(request);
    if (!user) {
      return response.redirect("/login");
    }
    const stations = await stationStore.getStationsByUserId(user._id);
    stations.sort((a, b) => a.name.localeCompare(b.name)); // Sort stations by name
    const viewData = {
      title: "WeatherTop Dashboard",
      stations: stations
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },
};

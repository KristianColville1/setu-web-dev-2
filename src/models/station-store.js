import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { reportStore } from "./report-store.js";

const db = initStore("stations");

export const stationStore = {
  async getAllStations() {
    await db.read();
    return db.data.stations;
  },

  async addStation(station) {
    await db.read();
    station._id = v4();
    db.data.stations.push(station);
    await db.write();
    return station;
  },

  async getStationByID(id) {
    await db.read();
    const station = db.data.stations.find((station) => station._id === id);
    station.reports = await reportStore.getReportsByStationId(id);
    for (const report of station.reports) {
      report.name = station.name;
      report.latitude = station.latitude;
      report.longitude = station.longitude;
    }
    return station;
  },

  async getStationsByUserId(userId) {
    await db.read();
    return db.data.stations.filter((station) => station.userId === userId);
  },

  async deleteStationByID(id) {
    await db.read();
    const index = db.data.stations.findIndex((station) => station._id === id);
    db.data.stations.splice(index, 1);
    await db.write();
  },

  async deleteAllStations() {
    db.data.stations = [];
    await db.write();
  },
};

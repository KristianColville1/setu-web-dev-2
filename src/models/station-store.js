import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { reportStore } from "./report-store.js";

const db = initStore("stations");

export const stationStore = {
  async getAllStations() {
    await db.read();
    const stations = db.data.stations || [];
    for (const station of stations) {
      station.code = await reportStore.getCodeByStationId(station._id);
      station.windDirection = await reportStore.getWindDirectionByStationId(station._id);
      station.temp = await reportStore.getTempByStationId(station._id);
      station.pressure = await reportStore.getPressureByStationId(station._id);
      station.wind = await reportStore.getWindByStationId(station._id);
      station.reports = await reportStore.getReportsByStationId(station._id);
      station.minTemp = await reportStore.getMinTempByStationId(station._id);
      station.maxTemp = await reportStore.getMaxTempByStationId(station._id);
      station.minWind = await reportStore.getMinWindByStationId(station._id);
      station.maxWind = await reportStore.getMaxWindByStationId(station._id);
      station.minPressure = await reportStore.getMinPressureByStationId(station._id);
      station.maxPressure = await reportStore.getMaxPressureByStationId(station._id);
    }
    return stations;
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
    const stations = db.data.stations.filter((station) => station.userId === userId);
    for (const station of stations) {
      station.code = await reportStore.getCodeByStationId(station._id);
      station.windDirection = await reportStore.getWindDirectionByStationId(station._id);
      station.temp = await reportStore.getTempByStationId(station._id);
      station.pressure = await reportStore.getPressureByStationId(station._id);
      station.windSpeed = await reportStore.getWindSpeedByStationId(station._id);
      station.reports = await reportStore.getReportsByStationId(station._id);
      station.minTemp = await reportStore.getMinTempByStationId(station._id);
      station.maxTemp = await reportStore.getMaxTempByStationId(station._id);
      station.minWindSpeed = await reportStore.getMinWindSpeedByStationId(station._id);
      station.maxWindSpeed = await reportStore.getMaxWindSpeedByStationId(station._id);
      station.minPressure = await reportStore.getMinPressureByStationId(station._id);
      station.maxPressure = await reportStore.getMaxPressureByStationId(station._id);
    }
    return stations;
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

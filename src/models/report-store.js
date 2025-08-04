import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("reports");

export const reportStore = {
  async getAllReports() {
    await db.read();
    return db.data.reports;
  },

  async addReport(stationID, report) {
    await db.read();
    report._id = v4();
    report.stationID = stationID;
    report.createdAt = new Date().toISOString(); // Add createdAt timestamp
    db.data.reports.push(report);
    await db.write();
    return report;
  },

  async getReportsByStationId(id) {
    await db.read();
    return db.data.reports.filter((report) => report.stationID === id);
  },

  async getReportById(id) {
    await db.read();
    return db.data.reports.find((report) => report._id === id);
  },

  async getCodeByStationId(stationID) {
    await db.read();
    const reports = db.data.reports.filter((report) => report.stationID === stationID);
    if (reports.length === 0) return "N/A";
    return reports[reports.length - 1].code;
  },

  async getWindDirectionByStationId(stationID) {
    await db.read();
    const reports = db.data.reports.filter((report) => report.stationID === stationID);
    if (reports.length === 0) return "N/A";
    return reports[reports.length - 1].windDirection;
  },

  async getTempByStationId(stationID) {
    await db.read();
    const reports = db.data.reports.filter((report) => report.stationID === stationID);
    if (reports.length === 0) return 0.0;
    return reports[reports.length - 1].temp;
  },

  async getWindSpeedByStationId(stationID) {
    await db.read();
    const reports = db.data.reports.filter((report) => report.stationID === stationID);
    if (reports.length === 0) return "N/A";
    return reports[reports.length - 1].windSpeed;
  },

  async getPressureByStationId(stationID) {
    await db.read();
    const reports = db.data.reports.filter((report) => report.stationID === stationID);
    if (reports.length === 0) return 0.0;
    return reports[reports.length - 1].pressure;
  },

  async getMinTempByStationId(stationID) {
    await db.read();
    const reports = db.data.reports.filter((report) => report.stationID === stationID);
    if (reports.length === 0) return 0.0;
    return Math.min(...reports.map((report) => parseFloat(report.temp)));
  },

  async getMaxTempByStationId(stationID) {
    await db.read();
    const reports = db.data.reports.filter((report) => report.stationID === stationID);
    if (reports.length === 0) return 0.0;
    return Math.max(...reports.map((report) => parseFloat(report.temp)));
  },

  async getMinWindSpeedByStationId(stationID) {
    await db.read();
    const reports = db.data.reports.filter((report) => report.stationID === stationID);
    if (reports.length === 0) return 0.0;
    return Math.min(...reports.map((report) => parseFloat(report.windSpeed)));
  },

  async getMaxWindSpeedByStationId(stationID) {
    await db.read();
    const reports = db.data.reports.filter((report) => report.stationID === stationID);
    if (reports.length === 0) return 0.0;
    return Math.max(...reports.map((report) => parseFloat(report.windSpeed)));
  },

  async getMinPressureByStationId(stationID) {
    await db.read();
    const reports = db.data.reports.filter((report) => report.stationID === stationID);
    if (reports.length === 0) return 0.0;
    return Math.min(...reports.map((report) => parseFloat(report.pressure)));
  },

  async getMaxPressureByStationId(stationID) {
    await db.read();
    const reports = db.data.reports.filter((report) => report.stationID === stationID);
    if (reports.length === 0) return 0.0;
    return Math.max(...reports.map((report) => parseFloat(report.pressure)));
  },

  async deleteReport(id) {
    await db.read();
    const index = db.data.reports.findIndex((report) => report._id === id);
    db.data.reports.splice(index, 1);
    await db.write();
  },

  async deleteAllReports() {
    db.data.reports = [];
    await db.write();
  },

  async updateReport(report, updateReport) {
    report.code = updateReport.code;
    report.temp = updateReport.temp;
    report.windSpeed = updateReport.windSpeed;
    report.windDirection = updateReport.windDirection;
    report.pressure = updateReport.pressure;
    await db.write();
  },
};

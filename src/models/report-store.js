import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("reports");

export const reportStore = {
  /**
   * Retrieves all reports from the store.
   */
  async getAllReports() {
    await db.read();
    return db.data.reports;
  },

  /**
   * Adds a new report for a station and returns the report.
   */
  async addReport(stationID, report) {
    await db.read();
    report._id = v4();
    report.stationID = stationID;
    report.createdAt = new Date().toISOString(); // Add createdAt timestamp
    db.data.reports.push(report);
    await db.write();
    return report;
  },

  /**
   * Retrieves all reports for a specific station.
   */
  async getReportsByStationId(id) {
    await db.read();
    return db.data.reports.filter((report) => report.stationID === id);
  },

  /**
   * Retrieves a report by its ID.
   */
  async getReportById(id) {
    await db.read();
    return db.data.reports.find((report) => report._id === id);
  },

  /**
   * Gets the latest code value for a station.
   */
  async getCodeByStationId(stationID) {
    await db.read();
    const reports = db.data.reports.filter((report) => report.stationID === stationID);
    if (reports.length === 0) return "N/A";
    return reports[reports.length - 1].code;
  },

  /**
   * Gets the latest wind direction for a station.
   */
  async getWindDirectionByStationId(stationID) {
    await db.read();
    const reports = db.data.reports.filter((report) => report.stationID === stationID);
    if (reports.length === 0) return "N/A";
    return reports[reports.length - 1].windDirection;
  },

  /**
   * Gets the latest temperature for a station.
   */
  async getTempByStationId(stationID) {
    await db.read();
    const reports = db.data.reports.filter((report) => report.stationID === stationID);
    if (reports.length === 0) return 0.0;
    return reports[reports.length - 1].temp;
  },

  /**
   * Gets the latest wind speed for a station.
   */
  async getWindSpeedByStationId(stationID) {
    await db.read();
    const reports = db.data.reports.filter((report) => report.stationID === stationID);
    if (reports.length === 0) return "N/A";
    return reports[reports.length - 1].windSpeed;
  },

  /**
   * Gets the latest pressure for a station.
   */
  async getPressureByStationId(stationID) {
    await db.read();
    const reports = db.data.reports.filter((report) => report.stationID === stationID);
    if (reports.length === 0) return 0.0;
    return reports[reports.length - 1].pressure;
  },

  /**
   * Gets the minimum temperature recorded for a station.
   */
  async getMinTempByStationId(stationID) {
    await db.read();
    const reports = db.data.reports.filter((report) => report.stationID === stationID);
    if (reports.length === 0) return 0.0;
    return Math.min(...reports.map((report) => parseFloat(report.temp)));
  },

  /**
   * Gets the maximum temperature recorded for a station.
   */
  async getMaxTempByStationId(stationID) {
    await db.read();
    const reports = db.data.reports.filter((report) => report.stationID === stationID);
    if (reports.length === 0) return 0.0;
    return Math.max(...reports.map((report) => parseFloat(report.temp)));
  },

  /**
   * Gets the minimum wind speed recorded for a station.
   */
  async getMinWindSpeedByStationId(stationID) {
    await db.read();
    const reports = db.data.reports.filter((report) => report.stationID === stationID);
    if (reports.length === 0) return 0.0;
    return Math.min(...reports.map((report) => parseFloat(report.windSpeed)));
  },

  /**
   * Gets the maximum wind speed recorded for a station.
   */
  async getMaxWindSpeedByStationId(stationID) {
    await db.read();
    const reports = db.data.reports.filter((report) => report.stationID === stationID);
    if (reports.length === 0) return 0.0;
    return Math.max(...reports.map((report) => parseFloat(report.windSpeed)));
  },

  /**
   * Gets the minimum pressure recorded for a station.
   */
  async getMinPressureByStationId(stationID) {
    await db.read();
    const reports = db.data.reports.filter((report) => report.stationID === stationID);
    if (reports.length === 0) return 0.0;
    return Math.min(...reports.map((report) => parseFloat(report.pressure)));
  },

  /**
   * Gets the maximum pressure recorded for a station.
   */
  async getMaxPressureByStationId(stationID) {
    await db.read();
    const reports = db.data.reports.filter((report) => report.stationID === stationID);
    if (reports.length === 0) return 0.0;
    return Math.max(...reports.map((report) => parseFloat(report.pressure)));
  },

  /**
   * Deletes a report by its ID.
   */
  async deleteReport(id) {
    await db.read();
    const index = db.data.reports.findIndex((report) => report._id === id);
    db.data.reports.splice(index, 1);
    await db.write();
  },

  /**
   * Deletes all reports from the store.
   */
  async deleteAllReports() {
    db.data.reports = [];
    await db.write();
  },

  /**
   * Updates a report with new values.
   */
  async updateReport(report, updateReport) {
    report.code = updateReport.code;
    report.temp = updateReport.temp;
    report.windSpeed = updateReport.windSpeed;
    report.windDirection = updateReport.windDirection;
    report.pressure = updateReport.pressure;
    await db.write();
  },
};

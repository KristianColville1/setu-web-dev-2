import express from "express";
import { dashboardController } from "./src/controllers/dashboard-controller.js";
import { aboutController } from "./src/controllers/about-controller.js";
import { stationController } from "./src/controllers/station-controller.js";
import {reportController} from "./src/controllers/report-controller.js";

export const router = express.Router();

router.get("/", dashboardController.index);
router.get("/dashboard", dashboardController.dashboard);
router.post("/dashboard/addstation", dashboardController.addStation);
router.get("/dashboard/deletestation/:id", dashboardController.deleteStation);
router.get("/about", aboutController.index);


router.get("/station/:id", stationController.index);

router.post("/station/:id/addreport", reportController.addReport);
router.get("/station/:stationid/deletereport/:reportid", reportController.deleteReport);
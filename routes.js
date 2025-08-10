import express from "express";
import { dashboardController } from "./src/controllers/dashboard-controller.js";
import { aboutController } from "./src/controllers/about-controller.js";
import { stationController } from "./src/controllers/station-controller.js";
import {reportController} from "./src/controllers/report-controller.js";
import { accountsController } from "./src/controllers/accounts-controller.js";

export const router = express.Router();

router.get("/", accountsController.index);
router.get("/login", accountsController.login);
router.get("/signup", accountsController.signup);
router.get("/logout", accountsController.logout);
router.post("/register", accountsController.register);
router.post("/authenticate", accountsController.authenticate);

router.get("/dashboard", dashboardController.index);
router.post("/dashboard/addstation", stationController.addStation);
router.get("/dashboard/deletestation/:id", stationController.deleteStation);
router.get("/about", aboutController.index);


router.get("/station/:id", stationController.index);

router.post("/station/:id/addreport", reportController.addReport);
router.get("/station/:stationid/deletereport/:reportid", reportController.deleteReport);
router.get("/station/:id/autogenerate", reportController.autoGenerateReport);
router.get("/my-account", accountsController.myAccount);
router.post("/my-account/update", accountsController.updateMyAccount);
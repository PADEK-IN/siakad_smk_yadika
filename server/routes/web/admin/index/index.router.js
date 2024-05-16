import express from "express";
// import {limit} from "../../../middlewares/rateLimiter.js";
import * as index from "./index.controller.js";

const router = express.Router();

// Routes
router.route("/dashboard").get(index.dashboardAdminPage);


export default router;

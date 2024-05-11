import express from "express";
import {limit} from "../../../middlewares/rateLimiter.js";
import * as index from "./index.controller.js";

const router = express.Router();

// Routes
router.route("/").get(index.getIndexPage);
router.route("/login").get(index.loginPage);
router.route("/register").get(index.registerPage);
router.route("/dashboard").get(index.dashboardAdminPage);


export default router;

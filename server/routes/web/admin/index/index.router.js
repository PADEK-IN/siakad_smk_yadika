import express from "express";
// import {limit} from "../../../middlewares/rateLimiter.js";
import * as index from "./index.controller.js";
import {isAuth, isUser } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/dashboard").get(isAuth, isUser, index.dashboardAdminPage);


export default router;

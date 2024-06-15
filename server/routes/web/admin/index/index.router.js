import express from "express";
// import {limit} from "../../../middlewares/rateLimiter.js";
import * as index from "./index.controller.js";
import {isAuth, isAdmin } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/dashboard").get(isAuth, isAdmin, index.dashboardAdminPage);
router.route("/jurusan").get(isAuth, isAdmin, index.jurusanAdminPage);


export default router;

import express from "express";
// import {limit} from "../../../middlewares/rateLimiter.js";
import * as index from "./nilai.controller.js";
import {isAuth, isMurid } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/").get(isAuth, isMurid, index.getNilaiPage);


export default router;

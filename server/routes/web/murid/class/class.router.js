import express from "express";
// import {limit} from "../../../middlewares/rateLimiter.js";
import * as index from "./class.controller.js";
import {isAuth, isMurid } from "../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/").get(isAuth, isMurid, index.getClassPage);
router.route("/:id/absensi").get(isAuth, isMurid, index.getAbsensiPage);


export default router;

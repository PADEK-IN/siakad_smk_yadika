import express from "express";
// import {limit} from "../../../middlewares/rateLimiter.js";
import * as index from "./index.controller.js";
import {isAuth, isGuru} from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/dashboard").get(isAuth, isGuru, index.getIndexPage);
router.route("/profile").get(isAuth, isGuru, index.getProfilePage);


export default router;

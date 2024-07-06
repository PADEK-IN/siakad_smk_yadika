import express from "express";
// import {limit} from "../../../middlewares/rateLimiter.js";
import * as index from "./index.controller.js";
import {isAuth, isMurid } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/dashboard").get(isAuth, isMurid, index.getIndexPage);
router.route("/profile").get( index.getProfilePage);


export default router;

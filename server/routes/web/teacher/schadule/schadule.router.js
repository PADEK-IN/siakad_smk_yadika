import express from "express";
// import {limit} from "../../../middlewares/rateLimiter.js";
import * as index from "./schadule.controller.js";
import {isAuth, isGuru} from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/").get(isAuth, isGuru, index.getSchadulePage);
router.route("/:id/add").get(isAuth, isGuru, index.addSchadulePage);
router.route("/:id/detail").get(isAuth, isGuru, index.detailSchadulePage);


export default router;

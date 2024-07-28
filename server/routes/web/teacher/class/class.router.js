import express from "express";
// import {limit} from "../../../middlewares/rateLimiter.js";
import * as index from "./class.controller.js";
import {isAuth, isGuru} from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/").get(isAuth, isGuru, index.getClassPage);
router.route("/:id/detail").get( index.detailClassPage);
router.route("/detail").get(isAuth, isGuru, index.classOwnPage);


export default router;

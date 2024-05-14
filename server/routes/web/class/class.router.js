import express from "express";
import {limit} from "../../../middlewares/rateLimiter.js";
import * as index from "./class.controller.js";

const router = express.Router();

// Routes
router.route("/").get(index.getClassPage);
router.route("/add").get(index.addClassPage);


export default router;

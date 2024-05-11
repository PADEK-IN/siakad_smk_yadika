import express from "express";
import {limit} from "../../../middlewares/rateLimiter.js";
import * as index from "./index.controller.js";

const router = express.Router();

// Routes
router.route("/").get(index.getIndexPage);

// // EXAMPLE TO USE MIDDLEWARE CACHE/COMPRESSION/LIMITER, Delete/Adjust if understand
// router.route("/test").get(limit(10) ,index.helloIndex); //Set limiter 10 request/minutes


export default router;

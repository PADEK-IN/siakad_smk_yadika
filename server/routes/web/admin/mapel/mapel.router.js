import express from "express";
// import {limit} from "../../../middlewares/rateLimiter.js";
import * as index from "./mapel.controller.js";

const router = express.Router();

// Routes
router.route("/").get(index.getIndexPage);



export default router;

import express from "express";
import {limit} from "../../../middlewares/rateLimiter.js";
import * as index from "./user.controller.js";

const router = express.Router();

// Routes
router.route("/").get(index.getUserPage);
router.route("/add").get(index.addUserPage);


export default router;

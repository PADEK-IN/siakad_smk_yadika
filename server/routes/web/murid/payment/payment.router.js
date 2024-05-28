import express from "express";
// import {limit} from "../../../middlewares/rateLimiter.js";
import * as index from "./payment.controller.js";
import {isAuth, isMurid } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/").get(isAuth, isMurid, index.getPaymentPage);
router.route("/add").get(isAuth, isMurid, index.addPaymentPage);


export default router;

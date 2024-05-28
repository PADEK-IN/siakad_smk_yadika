import express from "express";
// import {limit} from "../../../middlewares/rateLimiter.js";
import * as index from "./payment.controller.js";
import {isAuth, isAdmin } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/").get(isAuth, isAdmin, index.getPaymentPage);
router.route("/add").get(isAuth, isAdmin, index.addPaymentPage);
router.route("/:id/edit").get(isAuth, isAdmin, index.editPaymentPage);
// transaction
router.route("/transactions").get(isAuth, isAdmin, index.getTransactionPage);
router.route("/transaction/:id/accept").get(isAuth, isAdmin, index.acceptTransactionPage);


export default router;

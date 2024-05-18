import express from "express";
// import {limit} from "../../../middlewares/rateLimiter.js";
import * as index from "./auth.controller.js";
import {isAuth, isAuthLogin } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/").get(index.getIndexPage);
router.route("/login").get(isAuthLogin, index.loginPage);
router.route("/register").get(isAuthLogin, index.registerPage);


export default router;

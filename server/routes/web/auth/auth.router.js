import express from "express";
// import {limit} from "../../../middlewares/rateLimiter.js";
import * as index from "./auth.controller.js";
import {isAuth, isLogin } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/").get(index.getIndexPage);
router.route("/login").get(isLogin, index.loginPage);
router.route("/register").get(isLogin, index.registerPage);


export default router;

import express from "express";
import * as auth from "./auth.controller.js";
import { limit } from "../../../middlewares/rateLimiter.js";
import {isAuth, isAuthLogin } from "../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/register").post(isAuthLogin, auth.register); // limit(3) <-- masukkan middleware jika sudah selesai testing
router.route("/login").post(isAuthLogin, auth.login); // limit(3) <-- masukkan middleware jika sudah selesai testing
router.route("/logout").get(isAuth, auth.logout);

export default router;

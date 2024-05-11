import express from "express";
import { limit } from "../../../middlewares/rateLimiter.js";
import * as auth from "./auth.controller.js";

const router = express.Router();

// Routes
router.route("/register").post(limit(3), auth.register);
router.route("/login").post(limit(3), auth.login);
router.route("/logout").post(auth.logout);

export default router;

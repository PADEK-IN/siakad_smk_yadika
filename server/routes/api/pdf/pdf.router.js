import express from "express";
import * as pdf from "./pdf.controller.js";
import { limit } from "../../../middlewares/rateLimiter.js";
import {isAuth, isAuthLogin } from "../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/").post( pdf.generatePdf);
router.route("/download/:name").get( pdf.download);
router.route("/template").get( pdf.template);

export default router;

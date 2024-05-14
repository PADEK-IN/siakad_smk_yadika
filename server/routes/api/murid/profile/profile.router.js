import express from "express";
import * as profile from "./profile.controller.js";
// import {isAuth } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/create").post(profile.create);

export default router;

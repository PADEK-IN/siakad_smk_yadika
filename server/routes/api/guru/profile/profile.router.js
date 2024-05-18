import express from "express";
import * as profile from "./profile.controller.js";
// import {isAuth } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/").get(profile.getOneById);
router.route("/:id").get(profile.update);

export default router;

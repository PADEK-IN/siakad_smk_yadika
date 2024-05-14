import express from "express";
import * as user from "./users.controller.js";
// import {isAuth } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/create").post(user.create);

export default router;

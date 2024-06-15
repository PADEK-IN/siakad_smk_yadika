import express from "express";
// import {limit} from "../../../middlewares/rateLimiter.js";
import * as index from "./class.controller.js";
import {isAuth, isAdmin } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/").get(isAuth, isAdmin, index.getClassPage);
router.route("/add").get(isAuth, isAdmin, index.addClassPage);
router.route("/:id/edit").get(isAuth, isAdmin, index.editClassPage);


export default router;

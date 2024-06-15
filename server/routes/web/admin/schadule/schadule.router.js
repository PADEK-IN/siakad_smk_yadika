import express from "express";
// import {limit} from "../../../middlewares/rateLimiter.js";
import * as index from "./schadule.controller.js";
import {isAuth, isAdmin } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/").get(isAuth, isAdmin, index.getSchadulePage);
router.route("/add").get(isAuth, isAdmin, index.addSchadulePage);
router.route("/:id/edit").get(isAuth, isAdmin, index.editSchadulePage);


export default router;

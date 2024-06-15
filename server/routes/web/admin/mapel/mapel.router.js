import express from "express";
// import {limit} from "../../../middlewares/rateLimiter.js";
import * as index from "./mapel.controller.js";
import {isAuth, isAdmin } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/").get(isAuth, isAdmin, index.getMapelPage);
router.route("/add").get(isAuth, isAdmin, index.addMapelPage);
router.route("/:id/edit").get(isAuth, isAdmin, index.editMapelPage);

export default router;

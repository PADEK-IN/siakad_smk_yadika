import express from "express";
import * as spp from "./spp.controller.js";
// import {isAuth } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/").get(spp.getAll);
router.route("/:id").get(spp.getOneById);
router.route("/").post(spp.create);
router.route("/:id").patch(spp.update);
router.route("/:id").delete(spp.del);

export default router;

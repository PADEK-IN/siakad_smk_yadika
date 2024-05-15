import express from "express";
import * as murid from "./murid.controller.js";
// import {isAuth } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/").get(murid.getAll);
router.route("/:id").get(murid.getOneById);
router.route("/").post(murid.create);
router.route("/:id").patch(murid.update);
router.route("/:id").delete(murid.del);

export default router;

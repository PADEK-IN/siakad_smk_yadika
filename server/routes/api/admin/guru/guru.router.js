import express from "express";
import * as guru from "./guru.controller.js";
// import {isAuth } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/").get(guru.getAll);
router.route("/:id").get(guru.getOneById);
router.route("/").post(guru.create);
router.route("/:id").patch(guru.update);
router.route("/:id").delete(guru.del);

export default router;

import express from "express";
import * as absen from "./absen.controller.js";
// import {isAuth } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/").get(absen.getAll);
router.route("/:id").get(absen.getOneById);
router.route("/").post(absen.create);
router.route("/:id").patch(absen.update);
router.route("/:id").delete(absen.del);

export default router;

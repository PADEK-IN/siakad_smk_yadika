import express from "express";
import * as penilaian from "./penilaian.controller.js";
// import {isAuth } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/").get(penilaian.getAll);
router.route("/:id").get(penilaian.getOneById);
router.route("/").post(penilaian.create);
router.route("/:id").patch(penilaian.update);
router.route("/:id").delete(penilaian.del);

export default router;

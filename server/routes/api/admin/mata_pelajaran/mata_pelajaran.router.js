import express from "express";
import * as mataPelajaran from "./mata_pelajaran.controller.js";
// import {isAuth } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/").get(mataPelajaran.getAll);
router.route("/:id").get(mataPelajaran.getOneById);
router.route("/").post(mataPelajaran.create);
router.route("/:id").patch(mataPelajaran.update);
router.route("/:id").delete(mataPelajaran.del);

export default router;

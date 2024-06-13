import express from "express";
import * as kelas from "./kelas.controller.js";
// import {isAuth } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/").get(kelas.getAll);
router.route("/:id").get(kelas.getOneById);
router.route("/").post(kelas.createNilai);
router.route("/:id").patch(kelas.updateNilai);
router.route("/:id").delete(kelas.delNilai);

export default router;

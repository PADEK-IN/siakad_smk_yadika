import express from "express";
import * as jadwalPelajaran from "./jadwal_pelajaran.controller.js";
// import {isAuth } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/").get(jadwalPelajaran.getAll);
router.route("/:id").get(jadwalPelajaran.getOneById);
router.route("/").post(jadwalPelajaran.create);
router.route("/:id").patch(jadwalPelajaran.update);
router.route("/:id").delete(jadwalPelajaran.del);

export default router;

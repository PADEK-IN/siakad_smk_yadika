import express from "express";
import * as jadwalPelajaran from "./jadwal_pelajaran.controller.js";
// import {isAuth } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/").get(jadwalPelajaran.getAll);
router.route("/:id").get(jadwalPelajaran.getOneById);

export default router;

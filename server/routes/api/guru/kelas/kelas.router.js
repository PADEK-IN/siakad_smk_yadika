import express from "express";
import * as kelas from "./kelas.controller.js";
// import {isAuth } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
// api/guru/murid/
router.route("/:id").patch(kelas.update);

export default router;

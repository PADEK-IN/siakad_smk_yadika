import express from "express";
import * as jurusan from "./jurusan.controller.js";
// import {isAuth } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/").get(jurusan.getAll);
router.route("/:id").get(jurusan.getOneById);
router.route("/").post(jurusan.create);
router.route("/:id").patch(jurusan.update);
router.route("/:id").delete(jurusan.del);

export default router;

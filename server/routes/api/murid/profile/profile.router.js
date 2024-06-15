import express from "express";
import * as murid from "./profile.controller.js";
import { upload } from "../../../../middlewares/uploadHandler.js";
// import {isAuth } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/:id").get(murid.getOneById);
router.route("/:id").patch(upload.single("foto"), murid.update);

export default router;

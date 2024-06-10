import express from "express";
import * as payment from "./payment.controller.js";
import { upload } from "../../../../middlewares/uploadHandler.js";
// import {isAuth } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes]
router.route("/spp/:id").post(upload.single("foto"), payment.create);

export default router;

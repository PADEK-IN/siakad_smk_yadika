import express from "express";
import * as user from "./users.controller.js";
// import {isAuth } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/").get(user.getAll);
router.route("/:id").get(user.getOneById);
router.route("/add").post(user.create);
router.route("/:id").patch(user.update);
router.route("/:id").delete(user.del);

export default router;

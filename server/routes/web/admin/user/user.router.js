import express from "express";
// import {limit} from "../../../middlewares/rateLimiter.js";
import * as index from "./user.controller.js";
import {isAuth, isAdmin } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/").get(isAuth, isAdmin, index.getUserPage);
router.route("/add").get(isAuth, isAdmin, index.addUserPage);
router.route("/:id/edit").get(isAuth, isAdmin, index.editUserPage);

router.route("/students").get(isAuth, isAdmin, index.getStudentPage);
router.route("/student/add").get(isAuth, isAdmin, index.createStudentPage);
router.route("/student/:id").get(isAuth, isAdmin, index.detailStudentPage);
router.route("/student/:id/edit").get(isAuth, isAdmin, index.editStudentPage);

router.route("/teachers").get(isAuth, isAdmin, index.getTeacherPage);
router.route("/teacher/add").get(isAuth, isAdmin, index.addTeacherPage);
router.route("/teacher/:id").get(isAuth, isAdmin, index.detailTeacherPage);
router.route("/teacher/:id/edit").get(isAuth, isAdmin, index.editTeacherPage);

export default router;

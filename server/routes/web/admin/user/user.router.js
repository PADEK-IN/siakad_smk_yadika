import express from "express";
// import {limit} from "../../../middlewares/rateLimiter.js";
import * as index from "./user.controller.js";

const router = express.Router();

// Routes
router.route("/").get(index.getUserPage);
router.route("/add").get(index.addUserPage);
router.route("/:id/edit").get(index.editUserPage);

router.route("/students").get(index.getStudentPage);
router.route("/student/add").get(index.createStudentPage);
router.route("/student/:id").get(index.detailStudentPage);
router.route("/student/:id/edit").get(index.editStudentPage);

router.route("/teachers").get(index.getTeacherPage);
router.route("/teacher/add").get(index.addTeacherPage);
router.route("/teacher/:id").get(index.detailTeacherPage);
router.route("/teacher/:id/edit").get(index.editTeacherPage);

export default router;

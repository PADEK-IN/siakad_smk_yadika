import express from "express";
import {limit} from "../../../middlewares/rateLimiter.js";
import * as index from "./user.controller.js";

const router = express.Router();

// Routes
router.route("/").get(index.getUserPage);
router.route("/add").get(index.addUserPage);
router.route("/students").get(index.getStudentPage);
router.route("/teachers").get(index.getTeacherPage);
router.route("/student/add").get(index.addStudentPage);
router.route("/teacher/add").get(index.addTeacherPage);


export default router;

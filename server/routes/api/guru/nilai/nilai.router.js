import express from 'express';
import * as nilai from './nilai.controller.js';
// import {isAuth } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route('/').get(nilai.getNilai);
router.route('/').post(nilai.createNilai);
router.route('/:id').patch(nilai.updateNilai);
router.route('/:id').delete(nilai.delNilai);

export default router;

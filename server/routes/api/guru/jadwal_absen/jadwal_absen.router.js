import express from 'express';
import * as jadwalAbsen from './jadwal_absen.controller.js';
// import {isAuth } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route('/').get(jadwalAbsen.getAll);
router.route('/:id').get(jadwalAbsen.getOneById);
router.route('/').post(jadwalAbsen.create);
router.route('/:id').patch(jadwalAbsen.update);
router.route('/:id').delete(jadwalAbsen.del);

export default router;

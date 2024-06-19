import express from "express";
import * as transaksi from "./transaksi.controller.js";
// import {isAuth } from "../../../../middlewares/isAuthenticated.js";

const router = express.Router();

// Routes
router.route("/").get(transaksi.getAll);
router.route("/:id").get(transaksi.getOneById);
router.route("/").post(transaksi.create);
router.route("/validation").patch(transaksi.updateValidTransaksi);
router.route("/:id").patch(transaksi.update);
router.route("/:id").delete(transaksi.del);

export default router;

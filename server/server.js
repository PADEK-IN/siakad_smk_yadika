import path from 'path';
import { fileURLToPath } from 'url';
import express from "express";
import morgan from "morgan";

import schaduleRouter from "./routes/web/schadule/schadule.router.js";
import paymentRouter from "./routes/web/payment/payment.router.js";

import indexRouter from "./routes/web/index/index.router.js";
import {notFoundHandler} from "./middlewares/errors.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticFolder = path.resolve(__dirname, '../public');
const viewsFolder = path.resolve(__dirname, '../views');

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticFolder));
app.set('view engine', 'ejs');
app.set('views', viewsFolder);

// Routes Admin
app.use("/schadule", schaduleRouter);
app.use("/payment", paymentRouter);

// Routes
app.use("/", indexRouter);

// Routes Not Found
app.use(notFoundHandler);

export default app;

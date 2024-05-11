import path from 'path';
import { fileURLToPath } from 'url';
import express from "express";
import morgan from "morgan";

// Import middleware
import {notFoundHandler} from "./middlewares/errors.js";

// Import WEB Pages Router
import userRouter from "./routes/web/user/user.router.js";
import schaduleRouter from "./routes/web/schadule/schadule.router.js";
import paymentRouter from "./routes/web/payment/payment.router.js";
import indexRouter from "./routes/web/index/index.router.js";

// Import API Router
import authRouter from "./routes/api/auth/auth.router.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticFolder = path.resolve(__dirname, '../public');
const viewsFolder = path.resolve(__dirname, '../views');

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticFolder));
app.use(
    session({
        // store: new firestoreStore({
        //     database: db
        // }),
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 600000 * 24 //set to 24 hours
        }
    })
);
app.set('view engine', 'ejs');
app.set('views', viewsFolder);

// Routes WEB Pages
// Admin
app.use("/user", userRouter);
app.use("/schadule", schaduleRouter);
app.use("/payment", paymentRouter);

// Index
app.use("/", indexRouter);

// ROUTES API
// Auth
app.use("/api/auth", authRouter);

// Routes Not Found
app.use(notFoundHandler);

export default app;

import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import morgan from 'morgan';
import session from 'express-session';

// Import middleware
import { notFoundHandler } from './middlewares/errors.js';

// Import WEB Pages Router
import userRouter from './routes/web/admin/user/user.router.js';
import mapelRouter from './routes/web/admin/mapel/mapel.router.js';
import schaduleRouter from './routes/web/admin/schadule/schadule.router.js';
import classRouter from './routes/web/admin/class/class.router.js';
import paymentRouter from './routes/web/admin/payment/payment.router.js';
import indexRouter from './routes/web/admin/index/index.router.js';

// Import API Router
// Admin
import authRouter from './routes/api/auth/auth.router.js';
import adminUserRouter from './routes/api/admin/users/users.router.js';
import adminJurusanRouter from './routes/api/admin/jurusan/jurusan.router.js';
import adminMataPelajaranRouter from './routes/api/admin/mata_pelajaran/mata_pelajaran.router.js';
import adminGuruRouter from './routes/api/admin/guru/guru.router.js';
import adminKelasRouter from './routes/api/admin/kelas/kelas.router.js';
import adminMuridRouter from './routes/api/admin/murid/murid.router.js';
// Murid
import muridRouter from './routes/api/murid/profile/profile.router.js';
// Guru
import guruRouter from './routes/api/guru/profile/profile.router.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticFolder = path.resolve(__dirname, '../public');
const viewsFolder = path.resolve(__dirname, '../views');

app.use(morgan('dev'));
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
      maxAge: 600000 * 24, //set to 24 hours
    },
  }),
);
app.set('view engine', 'ejs');
app.set('views', viewsFolder);

// Routes WEB Pages
// Admin
app.use('/admin/user', userRouter);
app.use('/admin/mapel', mapelRouter);
app.use('/admin/schadule', schaduleRouter);
app.use('/admin/class', classRouter);
app.use('/admin/payment', paymentRouter);

// Index
app.use('/', indexRouter);

// ROUTES API
// Auth
app.use('/api/auth', authRouter);
// Admin
app.use('/api/admin/user', adminUserRouter);
app.use('/api/admin/jurusan', adminJurusanRouter);
app.use('/api/admin/mata-pelajaran', adminMataPelajaranRouter);
app.use('/api/admin/guru', adminGuruRouter);
app.use('/api/admin/kelas', adminKelasRouter);
app.use('/api/admin/murid', adminMuridRouter);
// Murid
app.use('/api/murid', muridRouter);
// Guru
app.use('/api/guru', guruRouter);

// Routes Not Found
app.use(notFoundHandler);

export default app;

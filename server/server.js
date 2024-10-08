import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import morgan from 'morgan';
import session from 'express-session';

// Import middleware
import { notFoundHandler } from './middlewares/errors.js';

// Import WEB Pages Router
import indexRouter from './routes/web/auth/auth.router.js';
// Admin
import userRouter from './routes/web/admin/user/user.router.js';
import mapelRouter from './routes/web/admin/mapel/mapel.router.js';
import schaduleRouter from './routes/web/admin/schadule/schadule.router.js';
import classRouter from './routes/web/admin/class/class.router.js';
import paymentRouter from './routes/web/admin/payment/payment.router.js';
import indexAdminRouter from './routes/web/admin/index/index.router.js';
// Guru
import indexTeacherRouter from './routes/web/teacher/index/index.router.js';
import classTeacherRouter from './routes/web/teacher/class/class.router.js';
import schaduleTeacherRouter from './routes/web/teacher/schadule/schadule.router.js';
// Murid
import indexMuridRouter from './routes/web/murid/index/index.router.js';
import classMuridRouter from './routes/web/murid/class/class.router.js';
import paymentMuridRouter from './routes/web/murid/payment/payment.router.js';
import nilaiMuridRouter from './routes/web/murid/nilai/nilai.router.js';

// Import API Router
// Admin
import authRouter from './routes/api/auth/auth.router.js';
import adminUserRouter from './routes/api/admin/users/users.router.js';
import adminJurusanRouter from './routes/api/admin/jurusan/jurusan.router.js';
import adminMataPelajaranRouter from './routes/api/admin/mata_pelajaran/mata_pelajaran.router.js';
import adminGuruRouter from './routes/api/admin/guru/guru.router.js';
import adminKelasRouter from './routes/api/admin/kelas/kelas.router.js';
import adminMuridRouter from './routes/api/admin/murid/murid.router.js';
import adminSppRouter from './routes/api/admin/spp/spp.router.js';
import adminTransaksiRouter from './routes/api/admin/transaksi/transaksi.router.js';
import adminPenilaianRouter from './routes/api/admin/penilaian/penilaian.router.js';
import adminJadwalPelajaranRouter from './routes/api/admin/jadwal_pelajaran/jadwal_pelajaran.router.js';
import adminJadwalAbsenRouter from './routes/api/admin/jadwal_absen/jadwal_absen.router.js';
import adminAbsenRouter from './routes/api/admin/absen/absen.router.js';
import pdfRouter from './routes/api/pdf/pdf.router.js';
// Murid
import muridProfileRouter from './routes/api/murid/profile/profile.router.js';
import muridKelasRouter from './routes/api/murid/kelas/kelas.router.js';
import muridJadwalPelajaranRouter from './routes/api/murid/jadwal_pelajaran/jadwal_pelajaran.router.js';
import muridJadwalAbsenRouter from './routes/api/murid/jadwal_absen/jadwal_absen.router.js';
import muridAbsenRouter from './routes/api/murid/absen/absen.router.js';
import muridPaymentRouter from './routes/api/murid/payment/payment.router.js';
// Guru
import guruProfileRouter from './routes/api/guru/profile/profile.router.js';
import guruNilaiRouter from './routes/api/guru/nilai/nilai.router.js';
import guruJadwalPelajaranRouter from './routes/api/guru/jadwal_pelajaran/jadwal_pelajaran.router.js';
import guruJadwalAbsenRouter from './routes/api/guru/jadwal_absen/jadwal_absen.router.js';
import guruAbsenRouter from './routes/api/guru/absen/absen.router.js';
import guruKelasRouter from './routes/api/guru/kelas/kelas.router.js';

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

// // Routes WEB Pages
app.use('/', indexRouter);
// Admin
app.use('/admin', indexAdminRouter);
app.use('/admin/user', userRouter);
app.use('/admin/mapel', mapelRouter);
app.use('/admin/schadule', schaduleRouter);
app.use('/admin/class', classRouter);
app.use('/admin/payment', paymentRouter);
// Teacher
app.use('/teacher', indexTeacherRouter);
app.use('/teacher/class', classTeacherRouter);
app.use('/teacher/schadule', schaduleTeacherRouter);
// Murid
app.use('/murid', indexMuridRouter);
app.use('/murid/class', classMuridRouter);
app.use('/murid/payment', paymentMuridRouter);
app.use('/murid/nilai', nilaiMuridRouter);

// // ROUTES API
// Auth
app.use('/api/auth', authRouter);
// PDF
app.use('/api/pdf', pdfRouter);
// Admin
app.use('/api/admin/user', adminUserRouter);
app.use('/api/admin/jurusan', adminJurusanRouter);
app.use('/api/admin/mata-pelajaran', adminMataPelajaranRouter);
app.use('/api/admin/guru', adminGuruRouter);
app.use('/api/admin/kelas', adminKelasRouter);
app.use('/api/admin/murid', adminMuridRouter);
app.use('/api/admin/spp', adminSppRouter);
app.use('/api/admin/transaksi', adminTransaksiRouter);
app.use('/api/admin/penilaian', adminPenilaianRouter);
app.use('/api/admin/jadwal-pelajaran', adminJadwalPelajaranRouter);
app.use('/api/admin/jadwal-absen', adminJadwalAbsenRouter);
app.use('/api/admin/absen', adminAbsenRouter);
// Murid
app.use('/api/murid/profile', muridProfileRouter);
app.use('/api/murid/kelas', muridKelasRouter);
app.use('/api/murid/jadwal-pelajaran', muridJadwalPelajaranRouter);
app.use('/api/murid/jadwal-absen', muridJadwalAbsenRouter);
app.use('/api/murid/absen', muridAbsenRouter);
app.use('/api/murid/payment', muridPaymentRouter);
// Guru
app.use('/api/guru/profile', guruProfileRouter);
app.use('/api/guru/nilai', guruNilaiRouter);
app.use('/api/guru/jadwal-pelajaran', guruJadwalPelajaranRouter);
app.use('/api/guru/jadwal-absen', guruJadwalAbsenRouter);
app.use('/api/guru/absen', guruAbsenRouter);
app.use('/api/guru/murid', guruKelasRouter);

// Routes Not Found
app.use(notFoundHandler);

export default app;

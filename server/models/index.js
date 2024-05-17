import {sequelize} from "../configs/database.js";
import Absen from "./absen.model.js";
import Guru from "./absen.model.js";
import Jadwal_Absen from "./jadwal_absen.model.js";
import Jadwal_Pelajaran from "./jadwal_pelajaran.model.js";
import Jurusan from "./jurusan.model.js";
import Kelas from "./kelas.model.js";
import Mata_Pelajaran from "./jadwal_absen.model.js";
import Murid from "./murid.model.js";
import Penilaian from "./penilaian.model.js";
import Spp from "./spp.model.js";
import Transaksi from "./transaksi.model.js";
import Users from "./users.model.js";
import Wali_Murid from "./wali_murid.model.js";

const db = {};

db.Absen = Absen;
db.Guru = Guru;
db.Jadwal_Absen = Jadwal_Absen;
db.Jadwal_Pelajaran = Jadwal_Pelajaran;
db.Jurusan = Jurusan;
db.Kelas = Kelas;
db.Mata_Pelajaran = Mata_Pelajaran;
db.Murid = Murid;
db.Penilaian = Penilaian;
db.Spp = Spp;
db.Transaksi = Transaksi;
db.User = Users;
db.Wali_Murid = Wali_Murid;

export { db };

// Database Synchron
export const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
  
        await sequelize.sync({ force: true }); // Sync models with the database
        //   await sequelize.sync({ force: true }); // Drop all table and create new
        console.log("Database synchronized.");
    } catch (error) {
        console.error("Unable to connect to the database:", error.message);
        throw error; // rethrow the error to be caught in server.js
    }
  };
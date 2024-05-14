import sequelize from "../configs/database.js";
import Absen from "./absen.model.js";
import Guru from "./guru.model.js";
import Jadwal_Absen from "./jadwal_absen.model.js";
import Jadwal_Pelajaran from "./jadwal_pelajaran.model.js";
import Jurusan from "./jurusan.model.js";
import Kelas from "./kelas.model.js";
import Mata_Pelajaran from "./mata_pelajaran.model.js";
import Murid from "./murid.model.js";
import Penilaian from "./penilaian.model.js";
import Tagihan_Spp from "./tagihan_spp.model.js";
import Users from "./users.model.js";
import Wali_Murid from "./wali_murid.model.js";

const db = {};
db.sequelize = sequelize;

// Load Model
db.users = Users;
db.users = Murid;
db.users = Guru;
db.users = Wali_Murid;
db.users = Jurusan;
db.users = Kelas;
db.users = Jadwal_Pelajaran;
db.users = Mata_Pelajaran;
db.users = Jadwal_Absen;
db.users = Absen;
db.users = Tagihan_Spp;
db.users = Penilaian;

// Relation


// Database Synchron
const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        await sequelize.sync({ force: false }); // Sync models with the database
        //   await sequelize.sync({ force: true }); // Drop all table and create new
        console.log("Database synchronized.");
    } catch (error) {
        console.error("Unable to connect to the database:", error.message);
        throw error; // rethrow the error to be caught in server.js
    }
};


export { db, initializeDatabase };

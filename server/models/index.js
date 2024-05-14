import sequelize from "../configs/database.js";
import Guru from "./guru.model.js";
import Jurusan from "./jurusan.model.js";
import Murid from "./murid.model.js";
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

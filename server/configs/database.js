import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PW,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging:
      process.env.ENV === "development"
        ? (...msg) => console.log(msg[0])
        : false,
  }
);

// Database Synchron
export const initializeDatabase = async () => {
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
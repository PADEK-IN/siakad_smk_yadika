import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Jurusan = sequelize.define(
  "Jurusan",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
);

export default Jurusan;

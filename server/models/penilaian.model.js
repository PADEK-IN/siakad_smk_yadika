import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Penilaian = sequelize.define(
  "Penilaian",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    tugas: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
    },
    uts: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
    },
    uas: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
    },
    tambahan: {
      type: DataTypes.INTEGER(3),
      allowNull: true,
    },
    akhir: {
      type: DataTypes.INTEGER(3),
      allowNull: true,
    },
    semester: {
      type: DataTypes.ENUM(["ganjil", "genap"]),
      allowNull: false,
    },
  },
);

export default Penilaian;

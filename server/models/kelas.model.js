import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Kelas = sequelize.define(
  "Kelas",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    tingkat: {
      type: DataTypes.ENUM(["10", "11", "12"]),
      allowNull: false,
    },
    kode: {
      type: DataTypes.CHAR(1),
      allowNull: false,
    },
    jumlah_murid: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
    },
    tahun: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
  },
);

export default Kelas;

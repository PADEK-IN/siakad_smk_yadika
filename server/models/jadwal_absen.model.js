import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Jadwal_Absen = sequelize.define(
  "Jadwal_Absen",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    tanggal: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    waktu_buka: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    waktu_tutup: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
);

export default Jadwal_Absen;

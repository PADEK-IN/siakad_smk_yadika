import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.js";
import Jadwal_Pelajaran from "./jadwal_pelajaran.model.js";

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
    id_jadwal_pelajaran: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Jadwal_Pelajaran,
        key: "id"
      }
    },
  },
);

Jadwal_Pelajaran.hasMany(Jadwal_Absen, {foreignKey: "id_jadwal_pelajaran"});
Jadwal_Absen.belongsTo(Jadwal_Pelajaran, {foreignKey: "id_jadwal_pelajaran"});

export default Jadwal_Absen;

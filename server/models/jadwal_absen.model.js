import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.js";
import Kelas from "./kelas.model.js";
import Mata_Pelajaran from "./mata_pelajaran.model.js";

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
    id_kelas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Kelas,
        key: "id"
      }
    },
    id_mata_pelajaran: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Mata_Pelajaran,
        key: "id"
      }
    },
  },
);

Kelas.hasMany(Jadwal_Absen, {foreignKey: "id_kelas"});
Jadwal_Absen.belongsTo(Kelas, {foreignKey: "id_kelas"})
Mata_Pelajaran.hasMany(Jadwal_Absen, {foreignKey: "id_mata_pelajaran"});
Jadwal_Absen.belongsTo(Mata_Pelajaran, {foreignKey: "id_mata_pelajaran"})

export default Jadwal_Absen;

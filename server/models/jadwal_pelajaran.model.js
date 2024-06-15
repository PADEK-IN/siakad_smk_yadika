import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.js";
import Kelas from "./kelas.model.js";
import Mata_Pelajaran from "./mata_pelajaran.model.js";

const Jadwal_Pelajaran = sequelize.define(
  "Jadwal_Pelajaran",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    hari: {
      type: DataTypes.ENUM(["senin", "selasa", "rabu", "kamis", "jumat", "sabtu"]),
      allowNull: false,
    },
    waktu_mulai: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    waktu_selesai: {
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
    isUse: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
    },
  },
);

Kelas.hasMany(Jadwal_Pelajaran, {foreignKey: "id_kelas"});
Jadwal_Pelajaran.belongsTo(Kelas, {foreignKey: "id_kelas"});
Mata_Pelajaran.hasMany(Jadwal_Pelajaran, {foreignKey: "id_mata_pelajaran"});
Jadwal_Pelajaran.belongsTo(Mata_Pelajaran, {foreignKey: "id_mata_pelajaran"});

export default Jadwal_Pelajaran;

import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.js";
import Murid from "./murid.model.js";
import Jadwal_Absen from "./jadwal_absen.model.js";

const Absen = sequelize.define(
  "Absen",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(["hadir", "izin", "sakit", "tidak hadir"]),
      allowNull: false,
    },
    id_murid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Murid,
        key: "id"
      }
    },
    id_jadwal_absen: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Jadwal_Absen,
        key: "id"
      }
    },
  },
);

Murid.hasMany(Absen, {foreignKey: "id_murid"});
Absen.belongsTo(Murid, {foreignKey: "id_murid"});
Jadwal_Absen.hasMany(Absen, {foreignKey: "id_jadwal_absen"});
Absen.belongsTo(Jadwal_Absen, {foreignKey: "id_jadwal_absen"});

export default Absen;
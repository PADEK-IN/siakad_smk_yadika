import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.js";
import Guru from "./guru.model.js";

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
      type: DataTypes.CHAR(5),
      allowNull: false,
      set(value) {
        this.setDataValue("kode", value.toUpperCase());
      },
    },
    tahun: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
    },
    id_wali_kelas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Guru,
        key: "id"
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
    },
  },
);

Guru.hasMany(Kelas, {foreignKey: "id_wali_kelas"});
Kelas.belongsTo(Guru, {foreignKey: "id_wali_kelas"});

export default Kelas;

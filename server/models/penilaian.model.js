import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.js";
import Mata_Pelajaran from "./mata_pelajaran.model.js";
import Murid from "./murid.model.js";

const Penilaian = sequelize.define(
  "Penilaian",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    id_mata_pelajaran: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Mata_Pelajaran,
        key: "id"
      }
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

Murid.hasMany(Penilaian, {foreignKey: "id_murid"});
Penilaian.belongsTo(Murid, {foreignKey: "id_murid"});
Mata_Pelajaran.hasMany(Penilaian, {foreignKey: "id_mata_pelajaran"});
Penilaian.belongsTo(Mata_Pelajaran, {foreignKey: "id_mata_pelajaran"});

export default Penilaian;

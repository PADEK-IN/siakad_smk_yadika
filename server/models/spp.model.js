import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.js";
import Jurusan from "./jurusan.model.js";

const Spp = sequelize.define(
  "Spp",
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
    id_jurusan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Jurusan,
        key: "id"
      }
    },
    tagihan: {
      type: DataTypes.DECIMAL(11, 2),
      allowNull: false,
    },
    bulan: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
    },
    tahun: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
    },
  },
);

Jurusan.hasMany(Spp, {foreignKey: "id_jurusan"});
Spp.belongsTo(Jurusan, {foreignKey: "id_jurusan"})

export default Spp;

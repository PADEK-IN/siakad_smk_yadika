import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.js";
import Murid from "./murid.model.js";

const Tagihan_Spp = sequelize.define(
  "Tagihan_Spp",
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
    bayar: {
      type: DataTypes.DECIMAL(11, 2),
      allowNull: false,
      defaultValue: 0,
    },
    tanggal_bayar: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    bukti_bayar: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: "blank.jpg"
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
    isPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
  },
);

Murid.hasMany(Tagihan_Spp, {foreignKey: "id_murid"});
Tagihan_Spp.belongsTo(Murid, {foreignKey: "id_murid"});

export default Tagihan_Spp;

import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.js";
import Murid from "./murid.model.js";
import Spp from "./spp.model.js";

const Transaksi = sequelize.define(
  "Transaksi",
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
    id_spp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Spp,
        key: "id"
      }
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
    isPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
  },
);

Murid.hasMany(Spp, {foreignKey: "id_murid"});
Spp.belongsTo(Murid, {foreignKey: "id_murid"});
Spp.hasMany(Transaksi, {foreignKey: "id_spp"});
Transaksi.belongsTo(Spp, {foreignKey: "id_spp"});

export default Transaksi;

import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Tagihan_Spp = sequelize.define(
  "Tagihan_Spp",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
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
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
  },
);

export default Tagihan_Spp;

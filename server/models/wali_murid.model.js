import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Wali_Murid = sequelize.define(
  "Wali_Murid",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nama_ayah: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    umur_ayah: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
    },
    pendidikan_ayah: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    pekerjaan_ayah: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status_hidup_ayah: {
      type: DataTypes.ENUM(["hidup", "meninggal"]),
      allowNull: false,
    },
    nama_ibu: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    umur_ibu: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
    },
    pendidikan_ibu: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    pekerjaan_ibu: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status_hidup_ibu: {
      type: DataTypes.ENUM(["hidup", "meninggal"]),
      allowNull: false,
    },
    alamat: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    no_hp: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
  },
);

export default Wali_Murid;

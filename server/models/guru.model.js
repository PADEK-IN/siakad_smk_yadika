import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Guru = sequelize.define(
  "Guru",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nip: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    nama: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    tempat_lahir: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    tanggal_lahir: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    jenis_kelamin: {
      type: DataTypes.ENUM(["laki-laki", "perempuan"]),
      allowNull: false,
    },
    agama: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    no_hp: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    pendidikan: {
      type: DataTypes.STRING(70),
      allowNull: true,
    },
    foto: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(["aktif", "cuti", "berhenti"]),
      allowNull: false,
      defaultValue: "aktif"
    },
  },
);

export default Guru;

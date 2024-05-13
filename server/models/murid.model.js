import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";
import { hash } from "../helpers/hashing.js";

const Murid = sequelize.define(
  "Murid",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nis: {
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
    hobi: {
      type: DataTypes.STRING(70),
      allowNull: true,
    },
    no_hp: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    sekolah_asal: {
      type: DataTypes.STRING(70),
      allowNull: true,
    },
    no_ijazah: {
      type: DataTypes.STRING(70),
      allowNull: true,
    },
    tahun_masuk: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
    },
    foto: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(["aktif", "lulus", "cuti", "berhenti"]),
      allowNull: false,
      defaultValue: "aktif"
    },
  },
);

export default Murid;

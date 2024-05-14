import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.js";
import Mata_Pelajaran from "./mata_pelajaran.model.js";
import Users from "./users.model.js";

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
    email: {
      type: DataTypes.STRING(70),
      references: {
        model: Users,
        key: "email",
      },
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
    id_mata_pelajaran: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Mata_Pelajaran,
        key: "id"
      }
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

Users.hasOne(Guru, {foreignKey: "email"});
Guru.belongsTo(Users, {foreignKey: "email"});
Mata_Pelajaran.hasOne(Guru, {foreignKey: "id_mata_pelajaran"});
Guru.belongsTo(Mata_Pelajaran, {foreignKey: "id_mata_pelajaran"})

export default Guru;

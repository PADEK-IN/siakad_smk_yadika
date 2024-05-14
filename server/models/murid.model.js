import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.js";
import Users from "./users.model.js";
import Wali_Murid from "./wali_murid.model.js";
import Jurusan from "./jurusan.model.js";
import Kelas from "./kelas.model.js";

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
    id_wali: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Wali_Murid,
        key: "id"
      }
    },
    id_jurusan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Jurusan,
        key: "id"
      }
    },
    id_kelas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Kelas,
        key: "id"
      }
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
  }
);

// Relations
Users.hasOne(Murid, {foreignKey: "email"});
Murid.belongsTo(Users, {foreignKey: "email"});
Wali_Murid.hasOne(Murid, {foreignKey: "id_wali"});
Murid.belongsTo(Wali_Murid, {foreignKey: "id_wali"});
Jurusan.hasMany(Murid, {foreignKey: "id_jurusan"});
Murid.belongsTo(Jurusan, {foreignKey: "id_jurusan"});
Kelas.hasMany(Murid, {foreignKey: "id_kelas"});
Murid.belongsTo(Kelas, {foreignKey: "id_kelas"});

export default Murid;

import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Jadwal_Pelajaran = sequelize.define(
  "Jadwal_Pelajaran",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    hari: {
      type: DataTypes.ENUM(["senin", "selasa", "rabu", "kamis", "jumat", "sabtu"]),
      allowNull: false,
    },
    waktu_mulai: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    waktu_selesai: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    isUse: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
  },
);

export default Jadwal_Pelajaran;

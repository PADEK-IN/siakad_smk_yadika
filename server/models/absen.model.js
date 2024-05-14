import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Absen = sequelize.define(
  "Absen",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(["hadir", "izin", "sakit", "tidak hadir"]),
      allowNull: false,
    },
  },
);

export default Absen;

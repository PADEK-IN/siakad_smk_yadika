import { DataTypes } from "sequelize";
import { sequelize } from "../configs/database.js";

const Mata_Pelajaran = sequelize.define(
  "Mata_Pelajaran",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    tingkat: {
      type: DataTypes.ENUM(["10", "11", "12"]),
      allowNull: false,
    },
    isUse: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
    },
  },
);

export default Mata_Pelajaran;

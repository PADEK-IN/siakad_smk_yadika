import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(70),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
      set(value) {
        this.setDataValue("email", value.toLowerCase());
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(["admin", "teacher", "student"]),
      allowNull: false,
      defaultValue: "student"
    },
    isValid: {
      type: DataTypes.ENUM(["valid", "invalid"]),
      allowNull: false,
      defaultValue: "invalid"
    },
  },
);

export default Users;

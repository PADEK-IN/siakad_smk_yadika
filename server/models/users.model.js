import { DataTypes } from "sequelize";
import sequelize from "../configs/database.js";
import { hash } from "../helpers/hashing.js";

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
      set(value) {
        this.setDataValue("password", hash(value));
      },
    },
    role: {
      type: DataTypes.ENUM(["admin", "teacher", "student"]),
      allowNull: false
    },
    status: {
        type: DataTypes.ENUM(["valid","invalid"]),
        allowNull: false,
        defaultValue: "invalid"
    }
  },
);

export default Users;

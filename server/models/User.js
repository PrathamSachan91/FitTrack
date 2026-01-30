import { DataTypes } from "sequelize";
import sequelize from "../lib/db.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    UserType: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    LastActive: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    tableName: "users",
    freezeTableName: true,
    timestamps: false,
  }
);

export default User;

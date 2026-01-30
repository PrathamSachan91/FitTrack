import { DataTypes } from "sequelize";
import sequelize from "../lib/db.js";
import User from "./User.js";

const Member = sequelize.define(
  "Member",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [10, 15],
      },
    },

    gender: {
      type: DataTypes.ENUM("Male", "Female", "Other"),
      allowNull: false,
    },

    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    emergencyContactName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    emergencyContactPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("ACTIVE", "PENDING", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    tableName: "Members",
    timestamps: true,
  }
);

User.hasOne(Member, { foreignKey: "userId", onDelete: "CASCADE" });
Member.belongsTo(User, { foreignKey: "userId" });

export default Member;

import { DataTypes } from "sequelize";
import sequelize from "../lib/db.js";

const AuthToken = sequelize.define("AuthToken", {
  tokenHash: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
},
  {
    tableName: "authToken",
    timestamps: false,
  }
);

export default AuthToken;

import { DataTypes } from "sequelize";
import sequelize from "../lib/db.js";
import Member from "./Member.js";

const TrainerProfile = sequelize.define("TrainerProfile", {
  memberId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },

  experienceYears: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  certifications: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  specializations: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  availability: {
    type: DataTypes.STRING,
  },

  trainingMode: {
    type: DataTypes.ENUM(
      "Personal Training",
      "Group Training",
      "Online Coaching",
      "Hybrid"
    ),
    allowNull: false,
  },

  bio: {
    type: DataTypes.TEXT,
  },

  status: {
    type: DataTypes.ENUM("PENDING", "ACTIVE", "REJECTED"),
    defaultValue: "PENDING", // Admin approval required
  },
});

/* 🔗 Associations */
TrainerProfile.belongsTo(Member, {
  foreignKey: "memberId",
  onDelete: "CASCADE",
});

Member.hasOne(TrainerProfile, {
  foreignKey: "memberId",
});

export default TrainerProfile;

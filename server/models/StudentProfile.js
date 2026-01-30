import { DataTypes } from "sequelize";
import sequelize from "../lib/db.js";
import Member from "./Member.js";

const StudentProfile = sequelize.define("StudentProfile", {
  memberId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  height: DataTypes.INTEGER,
  weight: DataTypes.INTEGER,

  fitnessGoal: DataTypes.STRING,
  experienceLevel: DataTypes.STRING,

  plan: DataTypes.STRING,
  startDate: DataTypes.DATEONLY,
  expiryDate: DataTypes.DATEONLY,
  duration: DataTypes.INTEGER,

  paymentMode: DataTypes.STRING,
  amountPaid: DataTypes.INTEGER,

  status: {
    type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
    defaultValue: "ACTIVE",
  },
});

StudentProfile.belongsTo(Member, {
  foreignKey: "memberId",
  onDelete: "CASCADE",
});

Member.hasOne(StudentProfile, {
  foreignKey: "memberId",
});


export default StudentProfile;

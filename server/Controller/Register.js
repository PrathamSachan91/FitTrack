import { Op } from "sequelize";
import Member from "../models/Member.js";
import StudentProfile from "../models/StudentProfile.js";
import TrainerProfile from "../models/TrainerProfile.js";

export const createStudentRegister = async (req, res) => {
  try {
    const {
      phone,
      gender,
      dateOfBirth,
      emergencyContactName,
      emergencyContactPhone,
      height,
      weight,
      fitnessGoal,
      experienceLevel,
      plan,
      startDate,
      duration,
      paymentMode,
      amountPaid,
    } = req.body;

    const { id: userId, userType } = req.user;

    if (userType !== 1) {
      return res.status(403).json({ message: "Only students can register" });
    }

    /* 1️⃣ Check Member */
    let member = await Member.findOne({ where: { userId } });
    if (member) {
      return res.status(409).json({ message: "Student already registered" });
    }

    /* 2️⃣ Create Member */
    member = await Member.create({
      userId,
      phone,
      gender,
      dateOfBirth,
      emergencyContactName,
      emergencyContactPhone,
      status: "ACTIVE",
    });

    const expiryDate = new Date(startDate);
    expiryDate.setMonth(expiryDate.getMonth() + Number(duration));

    const profile = await StudentProfile.create({
      memberId: member.id,
      height,
      weight,
      fitnessGoal,
      experienceLevel,
      plan,
      startDate,
      expiryDate,
      paymentMode,
      amountPaid,
      status: "ACTIVE",
    });

    res.status(201).json({
      message: "Student registration successful",
      profile,
    });
  } catch (error) {
    console.error("Student register error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

export const createTrainerRegister = async (req, res) => {
  try {
    const {
      phone,
      gender,
      dateOfBirth,
      emergencyContactName,
      emergencyContactPhone,
      experienceYears,
      certifications,
      specializations,
      availability,
      trainingMode,
      bio,
    } = req.body;

    const { id: userId, userType } = req.user;

    if (userType !== 2) {
      return res.status(403).json({ message: "Only trainers can register" });
    }

    let member = await Member.findOne({ where: { userId } });
    if (member) {
      return res.status(409).json({ message: "Trainer already registered" });
    }

    member = await Member.create({
      userId,
      phone,
      gender,
      dateOfBirth,
      emergencyContactName,
      emergencyContactPhone,
      status: "PENDING", // Admin approval
    });

    /* 3️⃣ Create Trainer Profile */
    const profile = await TrainerProfile.create({
      memberId: member.id,
      experienceYears,
      certifications,
      specializations,
      availability,
      trainingMode,
      bio,
      status: "PENDING",
    });

    res.status(201).json({
      message: "Trainer registration submitted for approval",
      profile,
    });
  } catch (error) {
    console.error("Trainer register error:", error);
    res.status(500).json({ message: "Trainer registration failed" });
  }
};


export const getRegisterStatus = async (req, res) => {
  try {
    const { id: userId, userType } = req.user;

    const member = await Member.findOne({ where: { userId } });

    if (!member) {
      return res.json({ enrolled: false });
    }

    if (userType === 1) {
      const student = await StudentProfile.findOne({
        where: {
          memberId: member.id,
          status: "ACTIVE",
        },
      });

      return res.json({
        enrolled: Boolean(student),
        status: student?.status || null,
      });
    }

    if (userType === 2) {
      const trainer = await TrainerProfile.findOne({
        where: {
          memberId: member.id,
          status: { [Op.in]: ["ACTIVE", "PENDING"] },
        },
      });

      return res.json({
        enrolled: Boolean(trainer),
        status: trainer?.status || null,
      });
    }
  } catch (error) {
    console.error("Register status error:", error);
    res.status(500).json({ message: "Failed to fetch register status" });
  }
};

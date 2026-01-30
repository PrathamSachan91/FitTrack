import Member from "../models/Member.js";
import StudentProfile from "../models/StudentProfile.js";
import TrainerProfile from "../models/TrainerProfile.js";

/* ================= STUDENT DASHBOARD ================= */
export const getStudentStats = async (req, res) => {
  try {
    const { id: userId, userType } = req.user;

    if (userType !== 1) {
      return res.status(403).json({ message: "Access denied" });
    }
    const member = await Member.findOne({ where: { userId } });
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const profile = await StudentProfile.findOne({
      where: {
        memberId: member.id,
        status: "ACTIVE",
      },
    });

    if (!profile) {
      return res.status(404).json({
        message: "Student profile not found",
      });
    }

    const today = new Date();
    const expiryDate = new Date(profile.expiryDate);

    const remainingDays = Math.max(
      Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24)),
      0
    );

    let age = null;
    if (member.dateOfBirth) {
      const dob = new Date(member.dateOfBirth);
      age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
    }

    res.json({
      plan: profile.plan,
      status: profile.status,
      startDate: profile.startDate,
      expiryDate: profile.expiryDate,
      remainingDays,

      fitnessGoal: profile.fitnessGoal,
      experienceLevel: profile.experienceLevel,
      height: profile.height,
      weight: profile.weight,

      gender: member.gender,
      age,
      phone: member.phone,

      paymentMode: profile.paymentMode,
      amountPaid: profile.amountPaid,
    });
  } catch (error) {
    console.error("Student dashboard error:", error);
    res.status(500).json({ message: "Failed to load student dashboard" });
  }
};

/* ================= TRAINER DASHBOARD ================= */
export const getTrainerStats = async (req, res) => {
  try {
    const { id: userId, userType } = req.user;

    if (userType !== 2) {
      return res.status(403).json({ message: "Access denied" });
    }

    const member = await Member.findOne({ where: { userId } });
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const profile = await TrainerProfile.findOne({
      where: { memberId: member.id },
    });

    if (!profile) {
      return res.status(404).json({
        message: "Trainer profile not found",
      });
    }

    const experienceLabel =
      profile.experienceYears >= 5
        ? "Senior Trainer"
        : profile.experienceYears >= 2
        ? "Intermediate Trainer"
        : "Junior Trainer";

    res.json({
      status: profile.status,

      phone: member.phone,
      gender: member.gender,
      dateOfBirth: member.dateOfBirth,

      experienceYears: profile.experienceYears,
      experienceLabel,
      certifications: profile.certifications,
      specializations: profile.specializations,

      availability: profile.availability,
      trainingMode: profile.trainingMode,
      bio: profile.bio,

      joinedAt: profile.createdAt,
    });
  } catch (error) {
    console.error("Trainer dashboard error:", error);
    res.status(500).json({ message: "Failed to load trainer dashboard" });
  }
};

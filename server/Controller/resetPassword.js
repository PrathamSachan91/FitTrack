import bcrypt from "bcrypt";
import User from "../models/User.js";
import AuthToken from "../models/AuthToken.js";
import nodemailer from "nodemailer";
import Otp from "../models/Otp.js";
import { getOtpEmailHtml } from "../utils/email.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const resetRequestOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser)
      return res.status(409).json({ message: "User does not exist please Register" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 2 * 60 * 1000);

    await Otp.destroy({ where: { email } });

    await Otp.create({
      email,
      otp,
      expires_at: expiry,
    });
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "OTP Verification",
      html: getOtpEmailHtml(otp),
    });

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const resetVerifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res.status(400).json({ message: "Email & OTP required" });

    const record = await Otp.findOne({ where: { email } });

    if (!record) return res.status(400).json({ message: "OTP not found" });

    if (new Date() > record.expires_at) {
      await Otp.destroy({ where: { email } });
      return res.status(400).json({ message: "OTP expired" });
    }

    if (record.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    await Otp.destroy({ where: { email } });

    res.json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await user.update({ password: hashedPassword });
    await AuthToken.destroy({ where: { userId: user.id } });

    return res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

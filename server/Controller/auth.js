import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";

import User from "../models/User.js";
import AuthToken from "../models/AuthToken.js";
import Otp from "../models/Otp.js";
import { getOtpEmailHtml } from "../utils/email.js";

/* -------------------- HELPERS -------------------- */

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/* -------------------- GOOGLE LOGIN -------------------- */

export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ message: "Google token missing" });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name } = ticket.getPayload();

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please Sign In first." });
    }

    await user.update({ LastActive: new Date() });

    const validity = 24 * 60 * 60;

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        userType: user.UserType,
      },
      process.env.JWT_SECRET,
      { expiresIn: validity }
    );

    const tokenHash = hashToken(token);

    await AuthToken.create({
      tokenHash,
      userId: user.id,
      expiresAt: new Date(Date.now() + validity * 1000),
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: validity * 1000,
    });

    res.json({ message: "Google login successful" });
  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(500).json({ message: "Google authentication failed" });
  }
};

/* -------------------- OTP -------------------- */

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 2 * 60 * 1000);

    await Otp.destroy({ where: { email } });
    await Otp.create({ email, otp, expires_at: expiry });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "OTP Verification",
      html: getOtpEmailHtml(otp),
    });

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyOtp = async (req, res) => {
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

/* -------------------- SIGN IN (REGISTER) -------------------- */

export const SignIn = async (req, res) => {
  const { username, email, password, userType } = req.body;

  if (!username || !email || !password || !userType) {
    return res.status(400).json({ message: "All fields required" });
  }

  if (![1, 2].includes(userType)) {
    return res.status(400).json({ message: "Invalid user type" });
  }

  try {
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      UserType: userType,
      LastActive: new Date(),
      createdAt: new Date(),
    });

    const validity = 24 * 60 * 60;

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        userType: user.UserType,
      },
      process.env.JWT_SECRET,
      { expiresIn: validity }
    );

    const tokenHash = hashToken(token);

    await AuthToken.create({
      tokenHash,
      userId: user.id,
      expiresAt: new Date(Date.now() + validity * 1000),
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: validity * 1000,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        userType: user.UserType,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* -------------------- LOGIN -------------------- */

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    await user.update({ LastActive: new Date() });

    const validity = 24 * 60 * 60;

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        userType: user.UserType,
      },
      process.env.JWT_SECRET,
      { expiresIn: validity }
    );

    const tokenHash = hashToken(token);

    await AuthToken.create({
      tokenHash,
      userId: user.id,
      expiresAt: new Date(Date.now() + validity * 1000),
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: validity * 1000,
    });

    res.json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* -------------------- LOGOUT -------------------- */

export const logout = async (req, res) => {
  const token = req.cookies?.token;

  if (token) {
    const tokenHash = hashToken(token);
    await AuthToken.destroy({ where: { tokenHash } });
  }

  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
  });

  res.json({ message: "Logged out successfully" });
};

/* -------------------- GET ME -------------------- */

export const getMe = async (req, res) => {
  res.json({
    username: req.user.username,
    email: req.user.email,
    userType: req.user.userType,
  });
};

import express from "express";
import { SignIn, login, sendOtp,verifyOtp, googleLogin,logout,getMe} from "../Controller/auth.js";
import {resetPassword, resetRequestOtp,resetVerifyOtp} from "../Controller/resetPassword.js"
import {getStudentStats, getTrainerStats} from "../Controller/dashBoard.js"
import {createStudentRegister,createTrainerRegister, getRegisterStatus} from "../Controller/Register.js"
import { isAuthCheck } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset/send-otp", resetRequestOtp);
router.post("/reset/verify-otp", resetVerifyOtp);
router.post("/reset/resetPassword", resetPassword);
router.post("/SignIn", SignIn);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.get("/dashboard/student", isAuthCheck , getStudentStats);
router.get("/dashboard/trainer", isAuthCheck , getTrainerStats);
router.post("/student/register", isAuthCheck , createStudentRegister);
router.post("/trainer/register", isAuthCheck , createTrainerRegister)
router.get("/register/status", isAuthCheck, getRegisterStatus);
router.post("/logout", isAuthCheck, logout);
router.get("/me", isAuthCheck, getMe);

export default router;

import express from "express";
import {
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,
  verifyOtp,
} from "../../controller/auth/authController.js";
import catchAsync from "../../services/error/catchAsync.js";

const router = express.Router();

router.route("/register").post(catchAsync(registerUser));
router.route("/login").post(catchAsync(loginUser));
router.route("/forgot-password").post(catchAsync(forgotPassword));
router.route("/verify-otp").post(catchAsync(verifyOtp));
router.route("/reset-password").post(catchAsync(resetPassword));

export default router;

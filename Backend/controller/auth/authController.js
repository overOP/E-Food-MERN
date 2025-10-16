import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../model/userModel.js";
import { sendEmail } from "../../services/sendEmail.js";

// Register user
export const registerUser = async (req, res) => {
  const { Name, Email, Number, Password } = req.body;
  if (!Name || !Email || !Number || !Password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  //check if user already exists
  const userFound = await User.findOne({ userEmail: Email });
  if (userFound) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  await User.create({
    userName: Name,
    userEmail: Email,
    userPhoneNumber: Number,
    userPassword: bcrypt.hashSync(Password, 10),
  });
  res.status(201).json({
    message: "User registered successfully",
  });
};

// Login user
export const loginUser = async (req, res) => {
  const { Email, Password } = req.body;
  if (!Email || !Password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  // check if user exists
  const userFound = await User.findOne({ userEmail: Email });
  if (!userFound) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  // check if password is correct
  const isMatched = bcrypt.compareSync(Password, userFound.userPassword);
  if (!isMatched) {
    return res.status(400).json({
      message: "Password is incorrect",
    });
  }
  // generate token // if ey is starting is JWT
  const token = jwt.sign(
    { id: userFound._id, role: userFound.role },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
  res.status(200).json({
    message: "User logged in successfully",
    data: token,
  });
};

// Forgot password
export const forgotPassword = async (req, res) => {
  const { Email } = req.body;
  if (!Email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }
  //check if user already exists
  const userExists = await User.findOne({ userEmail: Email });
  if (!userExists) {
    return res.status(400).json({
      message: "User is not registered",
    });
  }
  // send otp to user
  const otp = Math.floor(1000 + Math.random() * 9000);
  userExists.otp = otp;
  await userExists.save();
  await sendEmail({
    email: Email,
    subject: "OTP",
    message: `Your OTP is ${otp}`,
  });
  res.status(200).json({
    message: "OTP sent successfully",
  });
};

// verify otp
export const verifyOtp = async (req, res) => {
  const { Email, otp } = req.body;
  if (!Email || !otp) {
    return res.status(400).json({
      message: "All fields are required Email, otp",
    });
  }
  //check if user already exists
  const userExists = await User.findOne({ userEmail: Email });
  if (!userExists) {
    return res.status(400).json({
      message: "User is not registered",
    });
  }
  // check if otp is correct
  if (userExists.otp !== otp) {
    return res.status(400).json({
      message: "OTP is incorrect",
    });
  }
  // dispost otp
  userExists.otp = undefined;
  userExists.isOtpVerified = true;
  await userExists.save();
  res.status(200).json({
    message: "OTP verified successfully",
  });
};

// reset password
export const resetPassword = async (req, res) => {
  const { Email, newPassword, confirmPassword } = req.body;
  if (!Email || !newPassword || !confirmPassword) {
    return res.status(400).json({
      message: "All fields are required Email, newPassword, confirmPassword",
    });
  }
  // check if user already exists
  const userExists = await User.findOne({ userEmail: Email });
  if (!userExists) {
    return res.status(400).json({
      message: "User is not registered",
    });
  }
  // check if new password and confirm new password are same
  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      message: "New password and confirmPassword are not same",
    });
  }
  // check if user is verified
  if (!userExists.isOtpVerified) {
    return res.status(400).json({
      message: "User is not verified",
    });
  }

  // update password
  userExists.userPassword = bcrypt.hashSync(newPassword, 10);
  userExists.isOtpVerified = false;
  await userExists.save();
  res.status(200).json({
    message: "Password reset successfully",
  });
};
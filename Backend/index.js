import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "./database/database.js";
import User from "./model/userModel.js";
dotenv.config();
const app = express();
const port = process.env.PORT;
connectToDatabase(process.env.MONGO_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World",
  });
});

// register user api
app.post("/register", async (req, res) => {
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
});

// login user api
app.post("/login", async (req, res) => {
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
    token,
  });
});

//Listen server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});

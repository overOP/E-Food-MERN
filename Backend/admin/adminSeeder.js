import User from "../model/userModel.js";
import bcrypt from "bcrypt";

const adminSeeder = async (req, res) => {
  // Check if admin already exists
  const isAdminExists = await User.findOne({ userEmail: "admin@gmail.com" });

  if (!isAdminExists) {
    await User.create({
      userName: "admin",
      userEmail: "admin@gmail.com",
      userPhoneNumber: 1234567890,
      userPassword: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
      role: "admin",
    });
    console.log("✅ Admin created successfully");
  } else {
    console.log("ℹ️ Admin already exists, skipping seeding");
  }
};

export default adminSeeder;

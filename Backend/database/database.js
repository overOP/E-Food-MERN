import mongoose from "mongoose";
import adminSeeder from "../admin/adminSeeder.js";

export const connectToDatabase = async (URI) => {
  try {
    await mongoose.connect(URI);
    console.log("✅ MongoDB connected successfully");
    adminSeeder();
  } catch (error) {
    console.error("❌ MongoDB connection:", error.message);
    throw error;
  }
};

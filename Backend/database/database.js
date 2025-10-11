import mongoose from "mongoose";

export const connectToDatabase = async (URI) => {
  try {
    const mongoURI = URI;
    if (!mongoURI) {
      throw new Error("URI is not set in environment");
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw error;
  }
};

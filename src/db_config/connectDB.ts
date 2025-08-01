// src/db_config/connectDB.ts
import mongoose from "mongoose";

export async function connect() {
  try {
    if (mongoose.connection.readyState === 1) {
      return; // Already connected
    }
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}

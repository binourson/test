// config/db.js — handles the connection to MongoDB via Mongoose.

import mongoose from "mongoose";

// connectDB tries to connect to MongoDB. If it fails, we stop the whole app,
// because a backend with no database is useless.
export async function connectDB() {
  const uri = process.env.MONGODB_URI; // read the connection string from .env

  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // exit with an error code so we notice the problem
  }
}

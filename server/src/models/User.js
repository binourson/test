// models/User.js — defines what a "User" looks like in MongoDB.

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // unique: no two users can share an email. lowercase/trim normalize the input.
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // IMPORTANT: this stores the HASHED password, never the plain text.
    password: { type: String, required: true },
    name: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

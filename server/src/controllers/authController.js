// controllers/authController.js — registration & login logic.

import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// POST /auth/register -> create a new user with a securely hashed password
export async function register(req, res) {
  const { email, password, name } = req.body;

  // Basic presence check (the model also validates).
  if (!email || !password || !name) {
    const error = new Error("Email, password and name are required");
    error.statusCode = 400;
    throw error;
  }

  // Turn the plain password into a one-way hash. 10 = "cost factor" (higher = slower/safer).
  // bcrypt automatically adds a random salt, so identical passwords get different hashes.
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store the user with the HASH, never the plain password.
  const user = await User.create({ email, password: hashedPassword, name });

  // Respond WITHOUT the password (not even the hash should leave the server).
  res.status(201).json({ _id: user._id, email: user.email, name: user.name });
}

// POST /auth/login -> verify credentials, return a JWT
export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    throw error;
  }

  // 1) find the user by email
  const user = await User.findOne({ email });

  // 2) reject if no user OR wrong password.
  //    bcrypt.compare(plain, hash) returns true/false — await it.
  if (!user || !(await bcrypt.compare(password, user.password))) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // 3) issue a signed token carrying the user's id
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  // 4) send the token + safe user info (never the password)
  res.json({ token, user: { _id: user._id, email: user.email, name: user.name } });
}

export async function getMe(req, res) {
  const user = await User.findById(req.userId).select("-password");
  if (!user) { 
    const e = new Error("User not found");
    e.statusCode = 404;
    throw e; 
  }
  res.json(user);
}

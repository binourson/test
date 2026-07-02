// routes/authRoutes.js — maps auth URLs to controller functions.

import express from "express";
import { register, login, getMe } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register); // POST /auth/register
router.post("/login", login);       // POST /auth/login
router.get("/me", protect, getMe);  // GET /auth/me (protected route)

export default router;

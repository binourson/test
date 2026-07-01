// app.js — the entry point of our backend server. Stays lean: it just wires things together.

import "dotenv/config";                       // load .env into process.env (must run first)
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { connectRedis } from "./config/redis.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

// Connect to MongoDB BEFORE starting the server.
await connectDB();
await connectRedis();

const app = express();                        // create the Express application
const PORT = process.env.PORT || 3000;        // read the port from .env (fallback: 3000)

// Allow the React frontend (a different origin) to call this API
app.use(cors());

// Middleware: automatically parse incoming JSON request bodies into req.body
app.use(express.json());

// Health check route: GET / -> confirms the server is alive
app.get("/", (req, res) => {
  res.json({ message: "Shop API is running 🚀" });
});

// Mount the product router: every URL starting with "/products" is handled by it.
app.use("/products", productRoutes);
app.use("/auth", authRoutes);

// --- Error handling: these MUST come AFTER all routes ---
app.use(notFound);     // no route matched the URL -> clean 404 JSON
app.use(errorHandler); // any error thrown above -> formatted JSON response

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

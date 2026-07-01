// config/redis.js — connection to Redis (our in-memory cache).

import { createClient } from "redis";

// Create the client, pointing at the Redis container from docker-compose.yml.
const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

// Log connection errors so a Redis hiccup surfaces instead of failing silently.
redisClient.on("error", (err) => console.error("❌ Redis error:", err.message));

// Open the connection. Called once at startup from app.js.
export async function connectRedis() {
  await redisClient.connect();
  console.log("✅ Connected to Redis");
}

export default redisClient; // the client itself — used later for get/set

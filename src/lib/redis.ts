// lib/redis.ts
import { createClient } from "redis";

export const redis = createClient({
  url: process.env.REDIS_URL || "redis://172.17.0.1:6379",
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

redis.on("connect", () => {
  console.log("Redis connected successfully");
});

if (!redis.isOpen) {
  redis.connect().catch(console.error);
}

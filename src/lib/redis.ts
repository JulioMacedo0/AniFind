// redisClient.ts
import { createClient } from "redis";

export const redis = createClient({
  url: process.env.REDIS_URL || "redis://172.17.0.1:6379",
});
redis.connect();

import Redis from "ioredis";

const DEFAULT_TTL = Number(process.env.CACHE_TTL_SECONDS || 60);
const redisUrl = process.env.REDIS_URL;

// If REDIS_URL not provided, fall back to host/port envs with sensible defaults.
const redis = redisUrl
  ? new Redis(redisUrl)
  : new Redis({
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: Number(process.env.REDIS_PORT || 6379),
      password: process.env.REDIS_PASSWORD || undefined,
      db: Number(process.env.REDIS_DB || 0),
    });

const PREFIX = "cache:";

const prefixed = (key) => `${PREFIX}${key}`;

export const getCache = async (key) => {
  const raw = await redis.get(prefixed(key));
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (_err) {
    return null;
  }
};

export const setCache = async (key, value, ttlSeconds) => {
  const ttl = Number.isInteger(ttlSeconds) && ttlSeconds > 0 ? ttlSeconds : DEFAULT_TTL;
  const payload = JSON.stringify(value);
  if (ttl > 0) {
    await redis.set(prefixed(key), payload, "EX", ttl);
  } else {
    await redis.set(prefixed(key), payload);
  }
};

const deleteByPattern = async (pattern = "*") => {
  return new Promise((resolve, reject) => {
    const stream = redis.scanStream({ match: `${PREFIX}${pattern}`, count: 100 });
    const keys = [];

    stream.on("data", (resultKeys) => {
      if (Array.isArray(resultKeys) && resultKeys.length) {
        keys.push(...resultKeys);
      }
    });

    stream.on("end", async () => {
      if (!keys.length) return resolve(0);
      let deleted = 0;
      const chunkSize = 100;
      for (let i = 0; i < keys.length; i += chunkSize) {
        const chunk = keys.slice(i, i + chunkSize);
        deleted += await redis.del(...chunk);
      }
      resolve(deleted);
    });

    stream.on("error", (err) => reject(err));
  });
};

export const flushCache = async () => {
  try {
    await redis.flushdb();
  } catch (_err) {
    // Fallback if flushdb is disallowed.
    await deleteByPattern("*");
  }
};

export default redis;

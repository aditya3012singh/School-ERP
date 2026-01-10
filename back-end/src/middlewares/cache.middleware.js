import { getCache, setCache, flushCache } from "../utils/cache.js";

const buildCacheKey = (req) => {
  const userKey = req.user?.id ? `user:${req.user.id}` : "anon";
  return `${req.method}:${req.originalUrl}:${userKey}`;
};

export const cacheResponse = (options = {}) => {
  const ttlOverride = Number.isInteger(options.ttlSeconds) && options.ttlSeconds > 0
    ? options.ttlSeconds
    : undefined;

  return async (req, res, next) => {
    if (req.method !== "GET") return next();

    const cacheKey = buildCacheKey(req);

    try {
      const cached = await getCache(cacheKey);
      if (cached) {
        return res.status(cached.statusCode || 200).json(cached.body);
      }
    } catch (err) {
      console.error("Cache read failed", err.message || err);
    }

    const originalJson = res.json.bind(res);

    res.json = (body) => {
      const statusCode = res.statusCode || 200;
      if (statusCode >= 200 && statusCode < 500) {
        setCache(cacheKey, { body, statusCode }, ttlOverride).catch((err) => {
          console.error("Cache write failed", err.message || err);
        });
      }
      return originalJson(body);
    };

    next();
  };
};

export const invalidateCacheOnMutation = async (req, _res, next) => {
  if (req.method !== "GET") {
    try {
      await flushCache();
    } catch (err) {
      console.error("Cache flush failed", err.message || err);
    }
  }
  next();
};

export const cacheStore = { getCache, setCache, flushCache };

const rateLimitMap = new Map();

/**
 * Simple in-memory rate limiter.
 * @param {number} maxRequests - Max requests per window
 * @param {number} windowMs   - Time window in milliseconds
 */
function rateLimit(maxRequests = 60, windowMs = 60_000) {
  return (req, res, next) => {
    const key = req.headers['x-wallet-address'] || req.ip;
    const now = Date.now();

    if (!rateLimitMap.has(key)) {
      rateLimitMap.set(key, { count: 1, start: now });
      return next();
    }

    const entry = rateLimitMap.get(key);

    if (now - entry.start > windowMs) {
      rateLimitMap.set(key, { count: 1, start: now });
      return next();
    }

    if (entry.count >= maxRequests) {
      const retryAfter = Math.ceil((entry.start + windowMs - now) / 1000);
      res.setHeader('Retry-After', retryAfter);
      return res.status(429).json({
        error: 'Too many requests. Please slow down.',
        retryAfterSeconds: retryAfter,
      });
    }

    entry.count++;
    next();
  };
}

// Prune stale entries every 5 minutes to prevent unbounded memory growth
setInterval(() => {
  const cutoff = Date.now() - 120_000;
  for (const [key, entry] of rateLimitMap.entries()) {
    if (entry.start < cutoff) rateLimitMap.delete(key);
  }
}, 300_000);

module.exports = { rateLimit };

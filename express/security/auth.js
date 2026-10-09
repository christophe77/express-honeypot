const crypto = require("crypto");

// Compare hashes so the comparison time leaks neither content nor length.
function safeEqual(a, b) {
  const hashA = crypto.createHash("sha256").update(String(a)).digest();
  const hashB = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

function parseBasicAuth(header) {
  if (!header || !header.startsWith("Basic ")) return null;
  const decoded = Buffer.from(header.slice(6), "base64").toString();
  const separator = decoded.indexOf(":");
  if (separator === -1) return null;
  return {
    username: decoded.slice(0, separator),
    password: decoded.slice(separator + 1),
  };
}

// Slows down password guessing with a cooldown that doubles after each
// failure, capped at `maxDelayMs`. Never a hard lockout: behind a shared IP,
// a bot guessing passwords must not lock the owner out of their own logs.
function createFailureLimiter({
  freeAttempts = 5,
  baseDelayMs = 1000,
  maxDelayMs = 30 * 1000,
  forgetAfterMs = 15 * 60 * 1000,
  maxEntries = 10000,
  now = Date.now,
} = {}) {
  // Map keeps insertion order, so the first key is the least recently failed.
  const failures = new Map();

  function get(key) {
    const entry = failures.get(key);
    if (entry && now() - entry.lastFailure > forgetAfterMs) {
      failures.delete(key);
      return undefined;
    }
    return entry;
  }

  // Milliseconds to wait before the next attempt is even checked.
  function retryAfter(key) {
    const entry = get(key);
    if (!entry || entry.count < freeAttempts) return 0;
    const delay = Math.min(
      maxDelayMs,
      baseDelayMs * 2 ** (entry.count - freeAttempts)
    );
    return Math.max(0, entry.lastFailure + delay - now());
  }

  function fail(key) {
    const entry = get(key) || { count: 0 };
    failures.delete(key);
    failures.set(key, { count: entry.count + 1, lastFailure: now() });
    // Bounded memory, even if someone rotates through a /64 of IPv6.
    while (failures.size > maxEntries) {
      failures.delete(failures.keys().next().value);
    }
  }

  function succeed(key) {
    failures.delete(key);
  }

  return { retryAfter, fail, succeed, size: () => failures.size };
}

function basicAuth({
  username,
  password,
  realm = "beekeeper",
  limiter = createFailureLimiter(),
}) {
  return (req, res, next) => {
    const challenge = () => {
      res.setHeader(
        "WWW-Authenticate",
        `Basic realm="${realm}", charset="UTF-8"`
      );
      return res.sendStatus(401);
    };

    // No credentials is how every browser says hello before showing the
    // login prompt. That is not a failed attempt.
    const credentials = parseBasicAuth(req.headers.authorization);
    if (!credentials) return challenge();

    const wait = limiter.retryAfter(req.ip);
    if (wait > 0) {
      res.setHeader("Retry-After", String(Math.ceil(wait / 1000)));
      return res.sendStatus(429);
    }

    // Both checks always run, no short circuit.
    const userOk = safeEqual(credentials.username, username);
    const passOk = safeEqual(credentials.password, password);
    if (userOk && passOk) {
      limiter.succeed(req.ip);
      return next();
    }

    limiter.fail(req.ip);
    return challenge();
  };
}

module.exports = {
  basicAuth,
  createFailureLimiter,
  parseBasicAuth,
  safeEqual,
};

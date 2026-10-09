const crypto = require("crypto");
const config = require("../config");

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

// Tracks failed attempts per client to throttle brute-force/credential-stuffing.
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 60 * 1000;
const failedAttempts = new Map();

function isLockedOut(key) {
  const entry = failedAttempts.get(key);
  if (!entry) return false;
  if (Date.now() - entry.lastAttempt > LOCKOUT_MS) {
    failedAttempts.delete(key);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

function recordFailure(key) {
  const entry = failedAttempts.get(key) || { count: 0, lastAttempt: 0 };
  entry.count += 1;
  entry.lastAttempt = Date.now();
  failedAttempts.set(key, entry);
}

function basicAuth(req, res, next) {
  const key = req.ip;
  if (isLockedOut(key)) {
    res.setHeader("Retry-After", String(LOCKOUT_MS / 1000));
    return res.sendStatus(429);
  }

  const credentials = parseBasicAuth(req.headers.authorization);
  const { username, password } = config.beekeeperCredentials;
  // Both checks always run, no short circuit.
  const userOk = credentials
    ? safeEqual(credentials.username, username)
    : false;
  const passOk = credentials
    ? safeEqual(credentials.password, password)
    : false;
  if (userOk && passOk) {
    failedAttempts.delete(key);
    return next();
  }

  recordFailure(key);
  res.setHeader("WWW-Authenticate", 'Basic realm="beekeeper", charset="UTF-8"');
  return res.sendStatus(401);
}

module.exports = { basicAuth, parseBasicAuth, safeEqual };

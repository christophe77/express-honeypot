const crypto = require("crypto");

const env = (name, fallback) =>
  process.env[name] !== undefined && process.env[name] !== ""
    ? process.env[name]
    : fallback;

const bool = (name, fallback) => {
  const value = env(name, undefined);
  if (value === undefined) return fallback;
  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
};

// No more default "chris"/"chris". If no password is provided we generate one
// at startup and print it once, so the beekeeper is never left wide open.
const generatedPassword = env("BEEKEEPER_PASSWORD", undefined)
  ? null
  : crypto.randomBytes(18).toString("base64url");

const config = {
  port: env("PORT", "3001"),
  // Only enable when running behind a reverse proxy you control, otherwise
  // anyone can forge X-Forwarded-For and pick the IP that ends up in the logs.
  trustProxy: env("TRUST_PROXY", false),
  googleVerification: env("GOOGLE_VERIFICATION", ""),
  beekeeperCredentials: {
    username: env("BEEKEEPER_USERNAME", "beekeeper"),
    password: env("BEEKEEPER_PASSWORD", generatedPassword),
  },
  generatedPassword,
  remoteFileSave: {
    // dpaste publishes the payload publicly, so it is opt in.
    dpaste: bool("SAVE_DPASTE", false),
    local: bool("SAVE_LOCAL", true),
  },
  remoteFetch: {
    timeoutMs: Number(env("REMOTE_FETCH_TIMEOUT_MS", 5000)),
    maxBytes: Number(env("REMOTE_FETCH_MAX_BYTES", 1024 * 1024)),
  },
};
module.exports = config;

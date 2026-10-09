const crypto = require("crypto");
const path = require("path");
const defaultTraps = require("./pages");

const MIN_PASSWORD_LENGTH = 12;

const DEFAULTS = {
  // Where logs and captured payloads are stored.
  storageDir: path.join(process.cwd(), "honeypot-data"),
  // Fake vulnerable urls. A request whose path matches one of them is a hit.
  traps: defaultTraps,
  // Standalone mode: every request containing a url is treated as a hit,
  // not only the trap paths. Keep it off when mounted in a real app.
  catchAll: false,
  // Serve the bait index page, robots.txt and sitemap.xml.
  seo: false,
  googleVerification: "",
  save: { local: true, dpaste: false },
  fetch: { enabled: true, timeoutMs: 5000, maxBytes: 1024 * 1024 },
  geoip: true,
  // false, or { path, username, password } to mount the logs viewer.
  beekeeper: false,
  // Called with every report once it is saved.
  onHit: null,
};

function resolveOptions(options = {}) {
  const resolved = {
    ...DEFAULTS,
    ...options,
    save: { ...DEFAULTS.save, ...options.save },
    fetch: { ...DEFAULTS.fetch, ...options.fetch },
  };
  if (resolved.beekeeper) {
    const { username, password } = resolved.beekeeper;
    if (!username || !password) {
      throw new Error(
        "express-honeypot: beekeeper needs a username and a password"
      );
    }
    if (String(password).length < MIN_PASSWORD_LENGTH) {
      console.warn(
        `express-honeypot: the beekeeper password is shorter than ` +
          `${MIN_PASSWORD_LENGTH} characters. Failed logins are slowed down, ` +
          `but a weak password is still a weak password.`
      );
    }
    resolved.beekeeper = { path: "/beekeeper", ...resolved.beekeeper };
  }
  return resolved;
}

const env = (name, fallback) =>
  process.env[name] !== undefined && process.env[name] !== ""
    ? process.env[name]
    : fallback;

const bool = (name, fallback) => {
  const value = env(name, undefined);
  if (value === undefined) return fallback;
  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
};

function parseTrustProxy(value) {
  if (value === undefined || value === "false") return false;
  if (value === "true") return true;
  if (/^\d+$/.test(value)) return Number(value);
  return value;
}

// Options for the standalone server, read from environment variables.
function fromEnv() {
  // No default password. If none is provided we generate one at startup
  // and print it once, so the beekeeper is never left wide open.
  const generatedPassword = env("BEEKEEPER_PASSWORD", undefined)
    ? null
    : crypto.randomBytes(18).toString("base64url");

  return {
    port: env("PORT", "3001"),
    // Only enable behind a reverse proxy you control, otherwise anyone can
    // forge X-Forwarded-For and pick the IP that ends up in the logs.
    trustProxy: parseTrustProxy(env("TRUST_PROXY", undefined)),
    generatedPassword,
    honeypot: {
      storageDir: env("HIVE_DIR", path.join(__dirname, "hive")),
      catchAll: true,
      seo: true,
      googleVerification: env("GOOGLE_VERIFICATION", ""),
      save: {
        local: bool("SAVE_LOCAL", true),
        // dpaste publishes the payload publicly, so it is opt in.
        dpaste: bool("SAVE_DPASTE", false),
      },
      fetch: {
        enabled: bool("FETCH_PAYLOADS", true),
        timeoutMs: Number(env("REMOTE_FETCH_TIMEOUT_MS", 5000)),
        maxBytes: Number(env("REMOTE_FETCH_MAX_BYTES", 1024 * 1024)),
      },
      geoip: bool("GEOIP", true),
      beekeeper: {
        path: "/beekeeper",
        username: env("BEEKEEPER_USERNAME", "beekeeper"),
        password: env("BEEKEEPER_PASSWORD", generatedPassword),
      },
    },
  };
}

module.exports = { DEFAULTS, resolveOptions, fromEnv };

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

function basicAuth({ username, password, realm = "beekeeper" }) {
  return (req, res, next) => {
    const credentials = parseBasicAuth(req.headers.authorization);
    // Both checks always run, no short circuit.
    const userOk = credentials
      ? safeEqual(credentials.username, username)
      : false;
    const passOk = credentials
      ? safeEqual(credentials.password, password)
      : false;
    if (userOk && passOk) return next();

    res.setHeader(
      "WWW-Authenticate",
      `Basic realm="${realm}", charset="UTF-8"`
    );
    return res.sendStatus(401);
  };
}

module.exports = { basicAuth, parseBasicAuth, safeEqual };

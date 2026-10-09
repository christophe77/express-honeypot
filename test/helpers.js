const fs = require("fs");
const os = require("os");
const path = require("path");

async function listen(app) {
  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  return { server, base: `http://127.0.0.1:${server.address().port}` };
}

function tempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "honeypot-test-"));
}

const basic = (user, pass) =>
  `Basic ${Buffer.from(`${user}:${pass}`).toString("base64")}`;

// Wait until `check` stops throwing, for things that happen after the
// response was sent (logs, onHit).
async function eventually(check, timeoutMs = 2000) {
  const start = Date.now();
  for (;;) {
    try {
      return await check();
    } catch (err) {
      if (Date.now() - start > timeoutMs) throw err;
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
  }
}

module.exports = { listen, tempDir, basic, eventually };

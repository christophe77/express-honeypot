process.env.BEEKEEPER_USERNAME = "bee";
process.env.BEEKEEPER_PASSWORD = "keeper";

const { test, before, after } = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const app = require("../express/server");
const {
  isBlockedAddress,
  parseRemoteUrl,
} = require("../express/security/safeFetch");
const { checkFileInclusion } = require("../express/honey/controller");
const htmlTemplate = require("../express/honey/display/htmlTemplate");

let server;
let base;
const auth = `Basic ${Buffer.from("bee:keeper").toString("base64")}`;
const filesDir = path.join(__dirname, "../express/hive/files/2000-01-01");

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  base = `http://127.0.0.1:${server.address().port}`;
  fs.mkdirSync(filesDir, { recursive: true });
  fs.writeFileSync(
    path.join(filesDir, "abc-shell.txt.bee"),
    "<?php evil(); ?>"
  );
});

after(() => {
  server.close();
  fs.rmSync(filesDir, { recursive: true, force: true });
});

test("beekeeper data routes require auth", async () => {
  for (const url of [
    "/beekeeper",
    "/beekeeper/darts",
    "/beekeeper/js/index.js",
  ]) {
    const res = await fetch(base + url);
    assert.strictEqual(res.status, 401, url);
  }
  const del = await fetch(`${base}/beekeeper/logs/2000-01-01`, {
    method: "DELETE",
  });
  assert.strictEqual(del.status, 401);
});

test("wrong credentials are rejected", async () => {
  const bad = `Basic ${Buffer.from("bee:honey").toString("base64")}`;
  const res = await fetch(`${base}/beekeeper/darts`, {
    headers: { authorization: bad },
  });
  assert.strictEqual(res.status, 401);
});

test("old public routes are gone", async () => {
  const res = await fetch(`${base}/hive/x?path=..&file=../config.js`);
  const body = await res.text();
  assert.ok(!body.includes("beekeeperCredentials"));
  const del = await fetch(`${base}/beekeeper/d/log/..`);
  assert.strictEqual(del.status, 401);
});

test("payload download works and refuses traversal", async () => {
  const ok = await fetch(
    `${base}/beekeeper/files/2000-01-01/abc-shell.txt.bee`,
    {
      headers: { authorization: auth },
    }
  );
  assert.strictEqual(ok.status, 200);
  assert.strictEqual(await ok.text(), "<?php evil(); ?>");

  for (const url of [
    "/beekeeper/files/2000-01-01/..%2F..%2F..%2Fconfig.js",
    "/beekeeper/files/..%2F..%2Fhoney/controller.js",
    "/beekeeper/files/2000-01-01/..%5C..%5Cconfig.js",
  ]) {
    const res = await fetch(base + url, { headers: { authorization: auth } });
    assert.notStrictEqual(res.status, 200, url);
  }
});

test("delete refuses anything that is not a date", async () => {
  const res = await fetch(`${base}/beekeeper/logs/..%2F..%2Fserver.js`, {
    method: "DELETE",
    headers: { authorization: auth },
  });
  assert.strictEqual(res.status, 400);
});

test("private and metadata addresses are blocked", () => {
  for (const ip of [
    "127.0.0.1",
    "10.1.2.3",
    "172.20.0.1",
    "192.168.1.1",
    "169.254.169.254",
    "0.0.0.0",
    "::1",
    "fe80::1",
    "fd00::1",
    "::ffff:127.0.0.1",
  ]) {
    assert.ok(isBlockedAddress(ip), ip);
  }
  for (const ip of ["8.8.8.8", "1.1.1.1", "2606:4700:4700::1111"]) {
    assert.ok(!isBlockedAddress(ip), ip);
  }
  assert.strictEqual(
    parseRemoteUrl("http://169.254.169.254/latest/meta-data"),
    null
  );
  assert.strictEqual(parseRemoteUrl("http://[::1]:3001/"), null);
  assert.strictEqual(parseRemoteUrl("file:///etc/passwd"), null);
  assert.ok(parseRemoteUrl("http://evil.example.com/shell.txt"));
});

test("encoded inclusions are detected", () => {
  assert.strictEqual(
    checkFileInclusion(
      "/index.php?page=http%3A%2F%2Fevil.example%2Fc99.txt%3F"
    ),
    "http://evil.example/c99.txt?"
  );
});

test("fake pages escape the url and the payload", () => {
  const html = htmlTemplate(
    undefined,
    "/x?<script>alert(1)</script>",
    "<?php system($_GET[c]); ?>"
  );
  assert.ok(!html.includes("<script>alert(1)</script>"));
  assert.ok(!html.includes("<?php"));
  assert.ok(html.includes("&lt;?php"));
});

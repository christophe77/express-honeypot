const { test } = require("node:test");
const assert = require("node:assert");
const express = require("express");
const { basicAuth, createFailureLimiter } = require("../express/security/auth");
const { listen, basic } = require("./helpers");

const PASSWORD = "correct horse battery staple";

function fakeClock() {
  let time = 1_000_000;
  return { now: () => time, advance: (ms) => (time += ms) };
}

test("the first failures are free, then the cooldown doubles", () => {
  const clock = fakeClock();
  const limiter = createFailureLimiter({ now: clock.now });
  for (let i = 0; i < 4; i += 1) limiter.fail("ip");
  assert.strictEqual(limiter.retryAfter("ip"), 0);

  limiter.fail("ip");
  assert.strictEqual(limiter.retryAfter("ip"), 1000);
  clock.advance(1000);
  limiter.fail("ip");
  assert.strictEqual(limiter.retryAfter("ip"), 2000);
  clock.advance(2000);
  limiter.fail("ip");
  assert.strictEqual(limiter.retryAfter("ip"), 4000);
});

test("the cooldown is capped, so nobody is ever locked out for good", () => {
  const clock = fakeClock();
  const limiter = createFailureLimiter({ now: clock.now });
  for (let i = 0; i < 50; i += 1) limiter.fail("ip");
  assert.strictEqual(limiter.retryAfter("ip"), 30 * 1000);
  clock.advance(30 * 1000);
  assert.strictEqual(limiter.retryAfter("ip"), 0);
});

test("failures are forgotten after a while, and on success", () => {
  const clock = fakeClock();
  const limiter = createFailureLimiter({ now: clock.now });
  for (let i = 0; i < 10; i += 1) limiter.fail("a");
  clock.advance(16 * 60 * 1000);
  assert.strictEqual(limiter.retryAfter("a"), 0);
  assert.strictEqual(limiter.size(), 0);

  for (let i = 0; i < 10; i += 1) limiter.fail("b");
  limiter.succeed("b");
  assert.strictEqual(limiter.retryAfter("b"), 0);
});

test("memory stays bounded when attackers rotate IPs", () => {
  const limiter = createFailureLimiter({ maxEntries: 100 });
  for (let i = 0; i < 10000; i += 1)
    limiter.fail(`2001:db8::${i.toString(16)}`);
  assert.strictEqual(limiter.size(), 100);
});

test("over http: guesses get 429, the browser hello never counts", async () => {
  const app = express();
  const limiter = createFailureLimiter({ baseDelayMs: 60 * 1000 });
  app.use(basicAuth({ username: "bee", password: PASSWORD, limiter }));
  app.get("/", (req, res) => res.send("logs"));
  const { server, base } = await listen(app);

  try {
    // Plenty of anonymous requests, like a browser before the login prompt.
    for (let i = 0; i < 20; i += 1) {
      assert.strictEqual((await fetch(base)).status, 401);
    }
    const ok = await fetch(base, {
      headers: { authorization: basic("bee", PASSWORD) },
    });
    assert.strictEqual(ok.status, 200);

    const wrong = { headers: { authorization: basic("bee", "hunter2") } };
    for (let i = 0; i < 5; i += 1) {
      assert.strictEqual((await fetch(base, wrong)).status, 401);
    }
    const throttled = await fetch(base, wrong);
    assert.strictEqual(throttled.status, 429);
    // 60s asked, capped at the 30s maximum.
    assert.strictEqual(throttled.headers.get("retry-after"), "30");

    // Even the right password waits, otherwise the cooldown means nothing.
    const right = await fetch(base, {
      headers: { authorization: basic("bee", PASSWORD) },
    });
    assert.strictEqual(right.status, 429);
  } finally {
    server.close();
  }
});

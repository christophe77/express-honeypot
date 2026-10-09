const express = require("express");
const { resolveOptions } = require("./options");
const { createReporter } = require("./honey/report/reportMaker");
const { createAnalyser } = require("./honey/controller");
const { createHoneyMiddleware } = require("./honey/router");
const { createBeekeeperRouter } = require("./beekeeper/router");
const { createSeoRouter } = require("./seo/router");
const defaultTraps = require("./pages");

// Drop in middleware: `app.use(honeypot())`.
// Requests to a trap path get a fake vulnerable page and are logged,
// everything else goes straight to `next()`.
function honeypot(userOptions) {
  const options = resolveOptions(userOptions);
  const reporter = createReporter(options);
  const analyseReq = createAnalyser(options, reporter);
  const router = express.Router();

  if (options.seo) router.use(createSeoRouter(options));
  if (options.beekeeper) {
    router.use(
      options.beekeeper.path,
      createBeekeeperRouter({
        ...options.beekeeper,
        storageDir: options.storageDir,
      })
    );
  }
  router.use(createHoneyMiddleware(options, analyseReq));
  return router;
}

// A complete standalone honeypot app.
function createApp(userOptions, { trustProxy = false } = {}) {
  const app = express();
  app.set("trust proxy", trustProxy);
  app.disable("x-powered-by");
  app.use(honeypot({ catchAll: true, seo: true, ...userOptions }));
  return app;
}

module.exports = { honeypot, createApp, defaultTraps };

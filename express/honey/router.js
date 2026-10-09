const htmlTemplate = require("./display/htmlTemplate");

const pathOf = (url) => url.split("?")[0];

function createHoneyMiddleware(options, analyseReq) {
  const exact = new Map();
  const byPath = new Map();
  options.traps.forEach((trap) => {
    exact.set(trap.url, trap);
    if (!byPath.has(pathOf(trap.url))) byPath.set(pathOf(trap.url), trap);
  });

  return async function honeyMiddleware(req, res, next) {
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    // originalUrl, not url: url is relative to wherever we are mounted.
    const url = req.originalUrl;
    const trap = exact.get(url) || byPath.get(pathOf(url));
    if (!trap && !options.catchAll) return next();

    try {
      const { fileContent } = await analyseReq(req, trap);
      return res.send(htmlTemplate(trap, url, fileContent));
    } catch (err) {
      return next(err);
    }
  };
}

module.exports = { createHoneyMiddleware };

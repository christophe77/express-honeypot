const path = require("path");
const express = require("express");
const { createBeekeeperStore } = require("./controller");
const { basicAuth } = require("../security/auth");

const viewsPath = path.join(__dirname, "../views/beekeeper");

function createBeekeeperRouter({ storageDir, username, password }) {
  const store = createBeekeeperStore(storageDir);
  const router = express.Router();

  // Every single beekeeper route is behind auth, not just the HTML page.
  router.use(basicAuth({ username, password }));

  router.get("/", (req, res) => {
    // The dashboard uses relative urls, so it needs the trailing slash
    // to work wherever it is mounted.
    const [pathname, query] = req.originalUrl.split("?");
    if (!pathname.endsWith("/")) {
      return res.redirect(`${pathname}/${query ? `?${query}` : ""}`);
    }
    return res.sendFile(path.join(viewsPath, "index.html"));
  });

  router.use(express.static(viewsPath, { index: false }));

  router.get("/darts", (req, res) => {
    res.send(store.getDarts());
  });

  // DELETE, not GET: a link preview or a crawler should not wipe your logs.
  router.delete("/logs/:date", (req, res) => {
    const result = store.deleteDayLog(req.params.date);
    res.status(result.deleted ? 200 : 400).send(result);
  });

  router.get("/files/:date/:file", (req, res) => {
    const { date, file } = req.params;
    const filePath = store.getPayloadPath(date, file);
    if (!filePath) return res.status(404).send("not found");
    res.setHeader("X-Content-Type-Options", "nosniff");
    return res.download(filePath, file);
  });

  return router;
}

module.exports = { createBeekeeperRouter };

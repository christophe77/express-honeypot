const path = require("path");
const express = require("express");
const beekeeperController = require("./controller");
const { basicAuth } = require("../security/auth");

const beekeeperRouter = express.Router();

// Every single beekeeper route is behind auth, not just the HTML page.
beekeeperRouter.use(basicAuth);

beekeeperRouter.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/beekeeper/index.html"));
});

beekeeperRouter.use(
  express.static(path.join(__dirname, "../views/beekeeper"), { index: false })
);

beekeeperRouter.get("/darts", (req, res) => {
  res.send(beekeeperController.getDarts());
});

// DELETE, not GET: a link preview or a crawler should not wipe your logs.
beekeeperRouter.delete("/logs/:date", (req, res) => {
  const result = beekeeperController.deleteDayLog(req.params.date);
  res.status(result.deleted ? 200 : 400).send(result);
});

beekeeperRouter.get("/files/:date/:file", (req, res) => {
  const { date, file } = req.params;
  const filePath = beekeeperController.getPayloadPath(date, file);
  if (!filePath) return res.status(404).send("not found");
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("X-Content-Type-Options", "nosniff");
  return res.download(filePath, file);
});

module.exports = beekeeperRouter;

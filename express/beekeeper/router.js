const express = require("express");
const beekeeperController = require("./controller");
const beekeeperRouter = express.Router();

beekeeperRouter.get("/", function (req, res) {
  res.sendFile(`${__dirname}/public/index.html`);
});

beekeeperRouter.get("/darts", function (req, res) {
  res.send(beekeeperController.getDatas());
});

module.exports = beekeeperRouter;

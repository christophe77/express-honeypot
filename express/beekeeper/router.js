const express = require("express");
const beekeeperController = require("./controller");

const beekeeperRouter = express.Router();

beekeeperRouter.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

beekeeperRouter.get("/darts", (req, res) => {
  res.send(beekeeperController.getDarts());
});

module.exports = beekeeperRouter;

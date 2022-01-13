const express = require("express");
const beekeeperController = require("./controller");

const beekeeperRouter = express.Router();

beekeeperRouter.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

beekeeperRouter.get("/darts", (req, res) => {
  res.send(beekeeperController.getDarts());
});

beekeeperRouter.get("/d/log/:date", (req, res) => {
  const { date } = req.params;
  res.send(beekeeperController.deleteDayLog(date));
});

module.exports = beekeeperRouter;

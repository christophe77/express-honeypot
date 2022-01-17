const express = require("express");
const beekeeperController = require("./controller");
const config = require("../config");

const beekeeperRouter = express.Router();

beekeeperRouter.get("/", (req, res) => {
  const reject = () => {
    res.setHeader("www-authenticate", "Basic");
    res.sendStatus(401);
  };
  const { authorization } = req.headers;

  if (!authorization) {
    return reject();
  }

  const [username, password] = Buffer.from(
    authorization.replace("Basic ", ""),
    "base64"
  )
    .toString()
    .split(":");

  if (!(username === config.USERNAME && password === config.PASSWORD)) {
    return reject();
  }
  return res.sendFile(`${__dirname}/public/index.html`);
});

beekeeperRouter.get("/darts", (req, res) => {
  res.send(beekeeperController.getDarts());
});

beekeeperRouter.get("/d/log/:date", (req, res) => {
  const { date } = req.params;
  res.send(beekeeperController.deleteDayLog(date));
});

module.exports = beekeeperRouter;

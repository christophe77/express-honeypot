const express = require("express");
const { dirname } = require("path");

const appDir = dirname(require.main.filename);
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

  if (
    !(
      username === config.beekeeperCredentials.username &&
      password === config.beekeeperCredentials.password
    )
  ) {
    return reject();
  }
  return res.sendFile(`${appDir}/views/beekeeper/index.html`);
});

beekeeperRouter.get("/darts", (req, res) => {
  res.send(beekeeperController.getDarts());
});

beekeeperRouter.get("/d/log/:date", (req, res) => {
  const { date } = req.params;
  res.send(beekeeperController.deleteDayLog(date));
});

module.exports = beekeeperRouter;

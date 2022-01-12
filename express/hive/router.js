const express = require("express");

const hiveRouter = express.Router();

hiveRouter.get("/*", (req, res) => {
  const { file, path } = req.query;
  res.sendFile(`${__dirname}/files/${path}/${file}`);
});

module.exports = hiveRouter;

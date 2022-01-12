const express = require("express");
const fs = require("fs");

const hiveRouter = express.Router();

hiveRouter.get("/*", (req, res) => {
  const { file, path } = req.query;
  const filePath = `${__dirname}/files/${path}/${file}`;
  res.setHeader("Content-disposition", `attachment; filename=${file}`);
  res.setHeader("Content-type", "text/html");
  const filestream = fs.createReadStream(filePath);
  filestream.pipe(res);
});

module.exports = hiveRouter;
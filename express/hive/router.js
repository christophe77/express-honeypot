const express = require("express");
const fs = require("fs");

const hiveRouter = express.Router();

hiveRouter.get("/*", (req, res) => {
  const { file, path } = req.query;
  const filePath = `${__dirname}/files/${path}/${file}`;
  if (fs.existsSync(filePath)) {
    res.setHeader("Content-disposition", `attachment; filename=${file}`);
    res.setHeader("Content-type", "text/plain");
    const filestream = fs.createReadStream(filePath);
    filestream.pipe(res);
  } else {
    res.send("not found");
  }
});

module.exports = hiveRouter;

const express = require("express");
const htmlTemplate = require("./display/htmlTemplate");
const pages = require("../pages");
const honeyController = require("./controller");

const honeyRouter = express.Router();

honeyRouter.get("/*", async (req, res) => {
  // req.url is relative to the "/*" mount point, originalUrl is the real one.
  const honeyPage = pages.find((page) => req.originalUrl === page.url);
  const { fileContent } = await honeyController.analyseReq(req);
  res.send(htmlTemplate(honeyPage, req.originalUrl, fileContent));
});

module.exports = honeyRouter;

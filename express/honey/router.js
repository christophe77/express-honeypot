const express = require("express");
const htmlTemplate = require("./display/htmlTemplate");
const pages = require("../pages");
const common = require("./common/common");
const honeyController = require("./controller");

const honeyRouter = express.Router();

honeyRouter.get("/*", async (req, res) => {
  const honeyPage = pages.find((page) => req.url === page.url);
  const reportDatas = await honeyController.analyseReq(req);
  let fileContent;
  if (reportDatas.fileInclusion) {
    fileContent = await common.getRemoteFileContent(reportDatas.fileInclusion);
  }
  res.send(htmlTemplate(honeyPage, req.url, fileContent));
});

module.exports = honeyRouter;

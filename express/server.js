"use strict";
const path = require("path");
const express = require("express");
const cors = require("cors");
const beekeper = require("./beekeeper");
const htmlTemplate = require("./honey/htmlTemplate");
const pages = require("./honey/pages");
const generateStatics = require("./honey/generateStatics");
const config = require("./config");
const app = express();

app.use(cors());
app.set("port", config.PORT);

app.get("/", (req, res) => {
  res.send(generateStatics.indexHtml());
});

app.get("/sitemap.xml", async (req, res, next) => {
  res.set("Content-Type", "text/xml");
  res.send(generateStatics.sitemapXml());
});

app.get("/*", (req, res) => {
  const honeyPage = pages.find((page) => req.url === page.url);
  beekeper.analyseReq(req);
  res.send(honeyPage ? htmlTemplate(honeyPage) : req.url);
});

app.listen(app.get("port"), () => {
  console.log("listening");
});

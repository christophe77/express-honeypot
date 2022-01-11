"use strict";
const path = require("path");
const express = require("express");
const cors = require("cors");
const analyseReq = require("./honey/analyseReq");
const htmlTemplate = require("./honey/htmlTemplate");
const pages = require("./honey/pages");
const generateStatics = require("./honey/generateStatics");
const config = require("./config");
const beekeeperRouter = require("./beekeeper/router");
const app = express();

app.set("port", config.PORT);

app.use(cors());
app.use(express.static(__dirname + "/beekeeper/public"));
app.use("/beekeeper", beekeeperRouter);

app.get("/", (req, res) => {
  res.send(generateStatics.indexHtml());
});
app.get("/google91e0bbd11cc57bc9.html", (req, res) => {
  res.send("google-site-verification: google91e0bbd11cc57bc9.html");
});
app.get("/sitemap.xml", async (req, res, next) => {
  res.set("Content-Type", "text/xml");
  res.send(generateStatics.sitemapXml());
});
app.get("/*", (req, res) => {
  const honeyPage = pages.find((page) => req.url === page.url);
  analyseReq(req);
  res.send(honeyPage ? htmlTemplate(honeyPage) : req.url);
});

app.listen(app.get("port"), () => {
  console.log("listening");
});

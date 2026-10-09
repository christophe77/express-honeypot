const path = require("path");
const express = require("express");
const seoController = require("./controller");

function createSeoRouter(options) {
  const router = express.Router();
  const beekeeperPath = options.beekeeper ? options.beekeeper.path : "";

  router.get("/", (req, res) => {
    res.send(
      seoController.indexHtml({
        traps: options.traps,
        googleVerification: options.googleVerification,
        beekeeperPath,
      })
    );
  });
  router.get("/robots.txt", (req, res) => {
    res.type("text/plain").send(`User-agent: *\r\nDisallow: /hive/\r\n`);
  });
  router.get("/sitemap.xml", (req, res) => {
    // <loc> must be an absolute url, the protocol used to be missing.
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    res.set("Content-Type", "text/xml");
    res.send(seoController.sitemapXml(options.traps, baseUrl));
  });
  // The only public static file is the picture of our brave beekeeper.
  router.get("/beekeeper.jpg", (req, res) =>
    res.sendFile(path.join(__dirname, "../views/beekeeper.jpg"))
  );

  return router;
}

module.exports = { createSeoRouter };

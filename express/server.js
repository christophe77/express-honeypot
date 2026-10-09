const path = require("path");
const express = require("express");
const cors = require("cors");
const config = require("./config");
const beekeeperRouter = require("./beekeeper/router");
const honeyRouter = require("./honey/router");
const seoRouter = require("./seo/router");

function parseTrustProxy(value) {
  if (value === false || value === "false") return false;
  if (value === "true") return true;
  if (/^\d+$/.test(value)) return Number(value);
  return value;
}

const app = express();

app.set("port", config.port);
app.set("trust proxy", parseTrustProxy(config.trustProxy));
app.disable("x-powered-by");

app.use(cors());
app.use("/", seoRouter);
app.use("/beekeeper", beekeeperRouter);
// The only public static file is the picture of our brave beekeeper.
app.get("/beekeeper.jpg", (req, res) =>
  res.sendFile(path.join(__dirname, "views/beekeeper.jpg"))
);
app.use("/*", honeyRouter);

if (require.main === module) {
  app.listen(app.get("port"), () => {
    console.log(`listening on port ${config.port}`);
    if (config.generatedPassword) {
      console.log(
        `No BEEKEEPER_PASSWORD set, generated one for this run: ` +
          `${config.beekeeperCredentials.username} / ${config.generatedPassword}`
      );
    }
  });
}

module.exports = app;

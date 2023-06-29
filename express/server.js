const express = require("express");
const cors = require("cors");
const config = require("./config");
const beekeeperRouter = require("./beekeeper/router");
const hiveRouter = require("./hive/router");
const honeyRouter = require("./honey/router");
const seoRouter = require("./seo/router");

const app = express();

app.set("port", config.port);
app.set("trust proxy", true);

app.use(cors());
app.use("/", seoRouter);
app.use(express.static(`${__dirname}/views`));
app.use("/beekeeper", beekeeperRouter);
app.use("/hive", hiveRouter);
app.use("/*", honeyRouter);

app.listen(app.get("port"), () => {
  console.log(`listening on port ${config.port}`);
});

const { createApp } = require("./index");
const { fromEnv } = require("./options");

const config = fromEnv();
const app = createApp(config.honeypot, { trustProxy: config.trustProxy });

app.listen(config.port, () => {
  console.log(`🐝 express-honeypot listening on port ${config.port}`);
  if (config.generatedPassword) {
    console.log(
      `No BEEKEEPER_PASSWORD set, generated one for this run: ` +
        `${config.honeypot.beekeeper.username} / ${config.generatedPassword}`
    );
  }
});

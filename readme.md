# 🍯 express-honeypot

[![Tests](https://github.com/christophe77/express-honeypot/actions/workflows/test.yml/badge.svg)](https://github.com/christophe77/express-honeypot/actions/workflows/test.yml)
[![npm](https://img.shields.io/npm/v/express-honeypot)](https://www.npmjs.com/package/express-honeypot)
[![license](https://img.shields.io/github/license/christophe77/express-honeypot)](LICENSE)

A honeypot for remote file inclusion (RFI) and local file inclusion (LFI) bots, written in JavaScript on top of Express.

Bots crawl the web with lists of Google dorks, looking for 15 year old vulnerable PHP scripts. express-honeypot serves 310 fake vulnerable URLs built from those dorks. Every hit is logged with its IP, location and headers. The remote file the bot tries to include is safely downloaded and stored, then shown back as plain text so the attack *looks* like it worked.

Use it two ways:

- **🐳 Standalone**: a dedicated bait server, with sitemap and SEO so search engines (and bots) find it.
- **🧩 Middleware**: `app.use(honeypot())` in your existing Express app. Trap paths catch scanners, everything else goes to your routes.

## 🐳 Standalone with Docker

```bash
docker run -d -p 80:3001 -v hive:/data -e BEEKEEPER_PASSWORD=change-me ghcr.io/christophe77/express-honeypot
```

Or with the provided [docker-compose.yml](docker-compose.yml) (read only filesystem, no capabilities, non root user):

```bash
docker compose up -d
```

Logs and payloads are stored in the `/data` volume. The logs viewer is at `/beekeeper`.

## 🧩 As an Express middleware

```bash
npm install express-honeypot
```

```js
const express = require("express");
const { honeypot } = require("express-honeypot");

const app = express();

app.get("/", (req, res) => res.send("my real app"));

app.use(
  honeypot({
    storageDir: "./honeypot-data",
    beekeeper: { path: "/admin/bees", username: "me", password: process.env.BEES_PASSWORD },
    onHit: (hit) => console.log(`🐝 ${hit.ip} tried ${hit.fileInclusion || hit.url}`),
  })
);
```

Only requests to a trap path (like `/parse/parser.php`) are caught. A `?redirect=https://...` on one of your real routes is left alone. Mount it after your own routes so they always win.

### Options

| Option | Default | Description |
| --- | --- | --- |
| `storageDir` | `./honeypot-data` | Where logs and payloads are stored |
| `traps` | 310 built in traps | Array of `{ url, metas: { title, description }, content }`. Exported as `defaultTraps` so you can extend it |
| `onHit` | `null` | `(report) => {}` called for every new hit. Send it to Discord, Slack, your SIEM... |
| `beekeeper` | `false` | `{ path, username, password }` to mount the logs viewer |
| `save.local` | `true` | Save captured payloads to disk |
| `save.dpaste` | `false` | Also upload payloads to dpaste (public!) |
| `fetch.enabled` | `true` | Download the remote file the bot tried to include |
| `fetch.timeoutMs` | `5000` | Download timeout |
| `fetch.maxBytes` | `1048576` | Download size limit |
| `geoip` | `true` | Look up the attacker location with ip-api.com |
| `catchAll` | `false` | Treat every request containing a url as a hit, not only trap paths |
| `seo` | `false` | Serve the bait index page, `robots.txt` and `sitemap.xml` |

A standalone app is also available with `createApp(options)`.

## 🛠️ Standalone from source

```bash
git clone https://github.com/christophe77/express-honeypot
cd express-honeypot
npm install
npm start
```

Configuration is done with environment variables:

| Variable | Default | Description |
| --- | --- | --- |
| `PORT` | `3001` | Port of the web server |
| `BEEKEEPER_USERNAME` | `beekeeper` | Username for /beekeeper |
| `BEEKEEPER_PASSWORD` | random | Password for /beekeeper. If not set, a random one is generated and printed at startup |
| `HIVE_DIR` | `express/hive` | Where logs and payloads are stored (`/data` in Docker) |
| `TRUST_PROXY` | `false` | Express "trust proxy" value. Only set it behind a reverse proxy you control, otherwise visitors can spoof their IP |
| `SAVE_LOCAL` | `true` | Save captured payloads to disk |
| `SAVE_DPASTE` | `false` | Also upload payloads to dpaste (public!) |
| `FETCH_PAYLOADS` | `true` | Download the remote files |
| `GEOIP` | `true` | Look up attacker locations |
| `GOOGLE_VERIFICATION` | empty | Key given by Google Search Console to validate your website |
| `REMOTE_FETCH_TIMEOUT_MS` | `5000` | Timeout when downloading a payload |
| `REMOTE_FETCH_MAX_BYTES` | `1048576` | Max size of a downloaded payload |

## 🔍 How it works

- The app serves fake pages for known vulnerable paths from phpBB, Joomla, MODx and friends, plus a sitemap listing them all.
- When a bot opens one of them, the request (url, IP, location, headers) is stored in `<storage>/logs/YYYY-MM-DD.json`.
- The remote file used for the inclusion is downloaded to `<storage>/files/YYYY-MM-DD/sha256prefix-filename.bee`, with its sha256 in the report.
- The file content is added to the fake page as escaped text, as if the injection worked. Nothing is ever executed.
- To be effective in standalone mode, get your honeypot indexed. Google Search Console is the best place to start.

## 🛡️ Safety

A honeypot downloads files chosen by attackers, so it has to be careful:

- payloads are only downloaded from public hosts. Private networks, loopback and cloud metadata addresses are refused, checked at connection time (no DNS rebinding), and redirects are not followed
- downloads have a timeout and a size limit
- everything shown in fake pages and in the beekeeper is escaped
- the beekeeper and payload downloads are behind basic auth, with strict path validation
- failed logins trigger a cooldown that doubles each time (capped at 30s, never a hard lockout, so a bot cannot lock you out of your own logs)
- the Docker image runs as a non root user

## 🪤 Adding more traps

```js
const { honeypot, defaultTraps } = require("express-honeypot");

app.use(
  honeypot({
    traps: [
      ...defaultTraps,
      { url: "/old/gallery.php?dir=", metas: { title: "Gallery", description: "Photo gallery" }, content: "gallery" },
    ],
  })
);
```

In standalone mode, edit [express/pages.js](express/pages.js).

## License

MIT

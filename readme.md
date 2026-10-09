# express-honeypot

Express honeypot is a honeypot for remote file inclusion (RFI) and local file inclusion (LFI).<br />
The aim of this project is to catch bots and malwares that are scanning websites and try to upload remote files.<br />
Those RFI / LFI bots use a list of google dorks in order to search the web for vulnerable website.<br />
Express honeypot uses 310 fake urls based on RFI LFI dorks and serves them dynamicaly.<br />
Every request to any of the honeypot urls is logged and the remote file is downloaded and safely stored.<br />
This honeypot is written in javascript and uses express as web server.<br />
A light logs viewer page is available at /beekeeper but I think it needs to have more commands.<br />
Developement is still in progress but the core architecture won't change so you are safe to start using it.<br />

## How to use

Clone the project and install the dependencies :<br />

    git clone https://github.com/christophe77/express-honeypot
    cd express-honeypot
    yarn install

Configuration is done with environment variables :<br />

| Variable | Default | Description |
| --- | --- | --- |
| `PORT` | `3001` | Port of the web server |
| `BEEKEEPER_USERNAME` | `beekeeper` | Username for /beekeeper |
| `BEEKEEPER_PASSWORD` | random | Password for /beekeeper. If not set, a random one is generated and printed at startup |
| `TRUST_PROXY` | `false` | Express "trust proxy" value. Only set it when running behind a reverse proxy you control, otherwise visitors can spoof their IP |
| `SAVE_LOCAL` | `true` | Save captured payloads in _/express/hive/files_ |
| `SAVE_DPASTE` | `false` | Also upload payloads to dpaste (public!) |
| `GOOGLE_VERIFICATION` | empty | Key given by Google Search Console to validate your website |
| `REMOTE_FETCH_TIMEOUT_MS` | `5000` | Timeout when downloading a payload |
| `REMOTE_FETCH_MAX_BYTES` | `1048576` | Max size of a downloaded payload |

Payloads are only downloaded from public hosts : private networks, loopback and cloud metadata addresses are refused, redirects are not followed.<br />

Once installed you can start the app with :<br />

    yarn start

## How it works when deployed

The app starts a web server, generate a sitemap with known vulnerables paths from phpBB, joomla,....<br />
When a visitor opens an url and tries to include a remote file, the informations about the request are stored inside a json file in the _/express/hive_ directory.<br />
The remote file used for the inclusion is downloaded inside the hive folder with a .bee extension _/express/hive/files/YYYY-MM-DD/sha256prefix-filename.ext.bee_<br />
When an url is opened, a fake page is display with some basic html tags, random text and some SEO for google bots.<br />
If the page is opened with a remote file inside the url then the content of the file is added to the response body as if the injection worked.<br /> It's displayed in text and no real injection is posible.<br />
If you want your honeypot to be effective you need to spread it over search engines.<br /> Google search console is the best option to start.<br />
When you want to check the logs you have to go to _your-website.com/beekeeper_<br />

## How to add more fake urls

If you want to add urls you have to open _/express/pages.js_ and add new datas.<br />

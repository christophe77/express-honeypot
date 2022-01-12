# express-honeypot

Express honeypot is a honeypot for remote file inclusion (RFI) and local file inclusion (LFI).<br />
The aim of this project is to catch bots and malwares that are scanning websites and try to upload remote files.<br />
This honeypot is written in javascript and uses express as web server.<br />
A light logs viewer page is available at /beekeeper but it needs to have an authentication and more commands.<br />
Developement is still in progress.<br />

## How to use

Clone the project and install the dependencies :<br />

    git clone https://github.com/christophe77/express-honeypot
    cd express-honeypot
    yarn install

Edit _/express/config.js_ file.<br />
_HOST_ is your hosting url. It will be used to generate the sitemap.xml.<br />
_PORT_ is the port for the web server.<br />
_GOOGLE_VERIFICATION_ is the key given in google search console to validate your website.<br />

Once installed you can start the app with :<br />

    yarn start

## How it works when deployed

The app starts a web server, generate a sitemap with known vulnerables paths from phpBB, joomla,....<br />
When a visitor opens an url and tries to include a remote file, the informations about the request are stored inside a json file in the _/hive_ directory.<br />
The remote file used for the inclusion is downloaded inside the hive folder with a bee extension _/hive/YYYY-MM-DD/filename.ext.bee_<br />
When an url is opened, a fake page is display with some basic html tags, random text and some SEO for google bots.<br />
If you want your honeypot to be effective you have to add it the google search console.<br />
When you want to check the logs you have to go to _your-website.com/beekeeper_<br />

## How to add more fake urls

If you want to add urls you have to open _/express/honey/pages.js_ and add new datas.<br />

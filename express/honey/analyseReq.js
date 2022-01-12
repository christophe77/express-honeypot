const fs = require("fs");
const axios = require("axios");
const countryFlagEmoji = require("country-flag-emoji");

const timestamp = Date.now() / 1000 || 0;
const filePath = `./hive/${new Date().toISOString().split("T")[0]}.json`;

async function writeFile(jsonContent) {
  await fs.writeFile(
    filePath,
    JSON.stringify(jsonContent),
    { flag: "w" },
    (err) => {
      if (err) throw err;
    }
  );
}
function checkAndSave(evil) {
  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) throw err;
      const newJsonContent = JSON.parse(data);
      if (newJsonContent.datas.filter((e) => e.url === evil.url).length === 0) {
        newJsonContent.datas.push(evil);
        writeFile(newJsonContent);
      }
    });
  } else {
    writeFile({ datas: [evil] });
  }
}
function checkFileInclusion(url) {
  const expression =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const urlRegex = new RegExp(expression);
  const urlInjection = url.match(urlRegex)[0];
  return urlInjection || "";
}
async function getLocation(ip) {
  const URL = `http://ip-api.com/json/${ip}`;
  const location = { city: "", country: "", countryEmoji: "", isp: "" };
  try {
    const response = await axios.get(URL);
    const countryEmoji = countryFlagEmoji.get(response.data.countryCode);
    location.city = response.data.city;
    location.country = response.data.country;
    location.countryEmoji = countryEmoji.emoji;
    location.isp = response.data.isp;
    return location;
  } catch (err) {
    return location;
  }
}
async function analyseReq(req) {
  if (req.url.includes("http") || req.url.includes("www")) {
    const { url, headers } = req;
    const { ip } = req;
    const fileInclusion = checkFileInclusion(url);
    const location = await getLocation(ip);
    const evil = { id: timestamp, url, fileInclusion, headers, ip, location };
    checkAndSave(evil);
  }
}

module.exports = analyseReq;

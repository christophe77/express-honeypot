const axios = require("axios");
const countryFlagEmoji = require("country-flag-emoji");
const reportMaker = require("./report/reportMaker");

const timestamp = Date.now() / 1000 || 0;

async function getLocation(ip) {
  const url = `http://ip-api.com/json/${ip}`;
  const location = { city: "", country: "", countryEmoji: "", isp: "" };
  try {
    const response = await axios.get(url);
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

function checkFileInclusion(url) {
  const expression = /(https?:\/\/[^\s]+)/gi;
  const urlRegex = new RegExp(expression);
  const urlInjection = url.match(urlRegex) ? url.match(urlRegex)[0] : "";
  return urlInjection || "";
}

async function analyseReq(req) {
  if (req.url.includes("http") || req.url.includes("www")) {
    const { url, headers, ip } = req;
    const fileInclusion = checkFileInclusion(url);

    const location = await getLocation(ip);
    const reportDatas = {
      id: timestamp,
      url,
      fileInclusion,
      headers,
      ip,
      location,
    };

    reportMaker.generateReport(reportDatas);

    return reportDatas;
  }
  return {};
}
const honeyController = {
  analyseReq,
};
module.exports = honeyController;

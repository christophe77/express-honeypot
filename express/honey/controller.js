const crypto = require("crypto");
const axios = require("axios");
const countryFlagEmoji = require("country-flag-emoji");
const reportMaker = require("./report/reportMaker");
const { fetchRemoteFile } = require("../security/safeFetch");

async function getLocation(ip) {
  const location = { city: "", country: "", countryEmoji: "", isp: "" };
  if (!ip) return location;
  try {
    const url = `http://ip-api.com/json/${encodeURIComponent(ip)}`;
    const response = await axios.get(url, { timeout: 3000 });
    const countryEmoji = countryFlagEmoji.get(response.data.countryCode);
    location.city = response.data.city || "";
    location.country = response.data.country || "";
    location.countryEmoji = (countryEmoji && countryEmoji.emoji) || "";
    location.isp = response.data.isp || "";
    return location;
  } catch (err) {
    return location;
  }
}

function safeDecode(url) {
  try {
    return decodeURIComponent(url);
  } catch (e) {
    return url;
  }
}

function checkFileInclusion(url) {
  // Bots love to url encode their payload, so look at the decoded url too.
  const match = safeDecode(url).match(/https?:\/\/[^\s"'<>]+/i);
  return match ? match[0] : "";
}

async function analyseReq(req) {
  const { originalUrl: url, headers, ip } = req;
  const decodedUrl = safeDecode(url);
  if (!decodedUrl.includes("http") && !decodedUrl.includes("www")) return {};
  const fileInclusion = checkFileInclusion(url);

  // One fetch per hit. The payload used to be downloaded up to three times.
  const [location, fileContent] = await Promise.all([
    getLocation(ip),
    fileInclusion ? fetchRemoteFile(fileInclusion) : null,
  ]);

  const reportDatas = {
    id: `${Date.now()}-${crypto.randomBytes(4).toString("hex")}`,
    date: new Date().toISOString(),
    url,
    fileInclusion,
    headers,
    ip,
    location,
  };

  // Logging must never break the fake page.
  reportMaker
    .generateReport(reportDatas, fileContent)
    .catch((err) => console.error("report failed:", err.message));

  return { ...reportDatas, fileContent };
}

const honeyController = {
  analyseReq,
  checkFileInclusion,
};
module.exports = honeyController;

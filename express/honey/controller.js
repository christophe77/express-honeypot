const crypto = require("crypto");
const axios = require("axios");
const countryFlagEmoji = require("country-flag-emoji");
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

function looksLikeInclusion(url) {
  const decodedUrl = safeDecode(url);
  return decodedUrl.includes("http") || decodedUrl.includes("www");
}

function createAnalyser(options, reporter) {
  return async function analyseReq(req, trap) {
    const { originalUrl: url, headers, ip } = req;
    // A trap hit is always logged, even without a payload: someone went
    // looking for a 15 year old vulnerable script, that is a signal.
    if (!trap && !looksLikeInclusion(url)) return {};
    const fileInclusion = checkFileInclusion(url);

    // One fetch per hit. The payload used to be downloaded up to three times.
    const [location, fileContent] = await Promise.all([
      options.geoip ? getLocation(ip) : undefined,
      fileInclusion && options.fetch.enabled
        ? fetchRemoteFile(fileInclusion, options.fetch)
        : null,
    ]);

    const reportDatas = {
      id: `${Date.now()}-${crypto.randomBytes(4).toString("hex")}`,
      date: new Date().toISOString(),
      url,
      trap: trap ? trap.metas.title : "",
      fileInclusion,
      headers,
      ip,
      location: location || {},
    };

    // Logging must never break the fake page.
    reporter
      .generateReport(reportDatas, fileContent)
      .then(({ report, isNew }) => {
        if (isNew && typeof options.onHit === "function") {
          return options.onHit(report);
        }
        return undefined;
      })
      .catch((err) => console.error("express-honeypot:", err.message));

    return { ...reportDatas, fileContent };
  };
}

module.exports = {
  createAnalyser,
  checkFileInclusion,
  looksLikeInclusion,
};

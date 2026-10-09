const dns = require("dns");
const http = require("http");
const https = require("https");
const net = require("net");
const axios = require("axios");

// Everything a bot should never be able to make us call: loopback, private
// networks, link local (hello cloud metadata at 169.254.169.254), CGNAT,
// multicast, reserved...
const blockList = new net.BlockList();
[
  ["0.0.0.0", 8],
  ["10.0.0.0", 8],
  ["100.64.0.0", 10],
  ["127.0.0.0", 8],
  ["169.254.0.0", 16],
  ["172.16.0.0", 12],
  ["192.0.0.0", 24],
  ["192.0.2.0", 24],
  ["192.168.0.0", 16],
  ["198.18.0.0", 15],
  ["198.51.100.0", 24],
  ["203.0.113.0", 24],
  ["224.0.0.0", 4],
  ["240.0.0.0", 4],
].forEach(([address, prefix]) => blockList.addSubnet(address, prefix, "ipv4"));
[
  ["::", 128],
  ["::1", 128],
  ["64:ff9b::", 96],
  ["100::", 64],
  ["2001:db8::", 32],
  ["fc00::", 7],
  ["fe80::", 10],
  ["ff00::", 8],
].forEach(([address, prefix]) => blockList.addSubnet(address, prefix, "ipv6"));

function isBlockedAddress(address) {
  const family = net.isIP(address);
  if (family === 0) return true;
  if (family === 4) return blockList.check(address, "ipv4");
  const mapped = address.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);
  if (mapped) return blockList.check(mapped[1], "ipv4");
  // ::ffff:7f00:1 style IPv4 mapped addresses
  if (/^::ffff:/i.test(address)) return true;
  return blockList.check(address, "ipv6");
}

// Used by the http agents, so the IP we validate is the IP we connect to.
// No DNS rebinding shenanigans between the check and the request.
function guardedLookup(hostname, options, callback) {
  dns.lookup(hostname, { ...options, all: true }, (err, addresses) => {
    if (err) return callback(err);
    const blocked = addresses.find((a) => isBlockedAddress(a.address));
    if (blocked) {
      return callback(
        new Error(
          `Refusing to fetch ${hostname}: ${blocked.address} is private`
        )
      );
    }
    if (options && options.all) return callback(null, addresses);
    return callback(null, addresses[0].address, addresses[0].family);
  });
}

const httpAgent = new http.Agent({ lookup: guardedLookup });
const httpsAgent = new https.Agent({ lookup: guardedLookup });

function parseRemoteUrl(remoteUrl) {
  let url;
  try {
    url = new URL(remoteUrl);
  } catch (e) {
    return null;
  }
  if (!["http:", "https:"].includes(url.protocol)) return null;
  if (url.username || url.password) return null;
  // IP literals skip the lookup entirely, so check them here.
  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (net.isIP(host) && isBlockedAddress(host)) return null;
  return url;
}

// Fetch a payload an attacker pointed us at, as safely as we reasonably can:
// public hosts only, no redirects, small timeout, size cap, raw text only.
async function fetchRemoteFile(
  remoteUrl,
  { timeoutMs = 5000, maxBytes = 1024 * 1024 } = {}
) {
  const url = parseRemoteUrl(remoteUrl);
  if (!url) return null;
  try {
    const response = await axios.get(url.href, {
      httpAgent,
      httpsAgent,
      proxy: false,
      maxRedirects: 0,
      timeout: timeoutMs,
      maxContentLength: maxBytes,
      maxBodyLength: maxBytes,
      responseType: "text",
      transformResponse: [(data) => data],
      headers: { "User-Agent": "Mozilla/5.0 (compatible; bee/1.0)" },
    });
    return typeof response.data === "string" ? response.data : null;
  } catch (e) {
    return null;
  }
}

module.exports = { fetchRemoteFile, isBlockedAddress, parseRemoteUrl };

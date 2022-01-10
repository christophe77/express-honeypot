const fs = require("fs");
const timestamp = (Date.now() / 1000) | 0;
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
  try {
    if (fs.existsSync(filePath)) {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) throw err;
        const newJsonContent = JSON.parse(data);
        if (
          newJsonContent.datas.filter((e) => e.url === evil.url).length === 0
        ) {
          newJsonContent.datas.push(evil);
          writeFile(newJsonContent);
        }
      });
    } else {
      writeFile({ datas: [evil] });
    }
  } catch (err) {
    throw err;
  }
}
function checkFileInclusion(url) {
  const urlRegex = new RegExp(
    "([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+"
  );
  return url.match(urlRegex)[0] || "";
}
function analyseReq(req) {
  if (req.url.includes("http") || req.url.includes("www")) {
    const { url, headers } = req;
    const fileInclusion = checkFileInclusion(url);
    const evil = { id: timestamp, url, fileInclusion, headers };
    checkAndSave(evil);
  }
}
const beekeper = {
  analyseReq,
};
module.exports = beekeper;

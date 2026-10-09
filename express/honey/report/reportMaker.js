const crypto = require("crypto");
const fs = require("fs/promises");
const path = require("path");
const axios = require("axios");
const config = require("../../config");
const { sanitizeFileName } = require("../../security/sanitize");

const logsPath = path.join(__dirname, "../../hive/logs");
const filesPath = path.join(__dirname, "../../hive/files");

// The date is computed per hit now. It used to be frozen at boot, so every
// log went into the file of the day the server started. Forever.
const today = () => new Date().toISOString().split("T")[0];

// Serialize read/modify/write of the daily log so two bots hitting at the
// same time can't eat each other's entries or corrupt the JSON.
let writeQueue = Promise.resolve();
function enqueue(task) {
  const run = writeQueue.then(task, task);
  writeQueue = run.catch(() => {});
  return run;
}

async function saveRemoteFile(remoteUrl, fileContent, day) {
  const hash = crypto.createHash("sha256").update(fileContent).digest("hex");
  let remoteName = "";
  try {
    remoteName = new URL(remoteUrl).pathname.split("/").pop();
  } catch (e) {
    remoteName = "";
  }
  const fileName = `${hash.slice(0, 12)}-${sanitizeFileName(remoteName)}.bee`;
  const dir = path.join(filesPath, day);
  await fs.mkdir(dir, { recursive: true });
  // Raw bytes, not JSON.stringify'd soup.
  await fs.writeFile(path.join(dir, fileName), fileContent);
  return { fileName, pathName: day, sha256: hash };
}

async function dpaste(content) {
  try {
    const body = `content=${encodeURIComponent(content)}&syntax=text`;
    const response = await axios.post("https://dpaste.com/api/", body, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      timeout: 5000,
    });
    return String(response.data).trim();
  } catch (error) {
    return "";
  }
}

async function appendToDailyLog(day, report) {
  const dataFilePath = path.join(logsPath, `${day}.json`);
  let content = { datas: [] };
  try {
    content = JSON.parse(await fs.readFile(dataFilePath, "utf8"));
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }
  if (content.datas.some((e) => e.url === report.url)) return;
  content.datas.push(report);
  const tmpPath = `${dataFilePath}.tmp`;
  await fs.writeFile(tmpPath, JSON.stringify(content));
  await fs.rename(tmpPath, dataFilePath);
}

async function generateReport(reportDatas, fileContent) {
  const day = today();
  const report = { ...reportDatas };
  const hasPayload = typeof fileContent === "string" && fileContent !== "";

  if (hasPayload && config.remoteFileSave.dpaste) {
    report.reportUrl = await dpaste(fileContent);
  }
  if (hasPayload && config.remoteFileSave.local) {
    report.file = await saveRemoteFile(report.fileInclusion, fileContent, day);
  }

  await enqueue(() => appendToDailyLog(day, report));
}

const reportMaker = {
  generateReport,
};
module.exports = reportMaker;

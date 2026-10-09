const crypto = require("crypto");
const fs = require("fs/promises");
const path = require("path");
const axios = require("axios");
const { sanitizeFileName } = require("../../security/sanitize");

// Computed per hit, never at boot (it used to be frozen at startup).
const today = () => new Date().toISOString().split("T")[0];

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

function createReporter({ storageDir, save }) {
  const logsPath = path.join(storageDir, "logs");
  const filesPath = path.join(storageDir, "files");

  // Serialize read/modify/write of the daily log so two bots hitting at the
  // same time can't eat each other's entries or corrupt the JSON.
  let writeQueue = Promise.resolve();
  const enqueue = (task) => {
    const run = writeQueue.then(task, task);
    writeQueue = run.catch(() => {});
    return run;
  };

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

  async function appendToDailyLog(day, report) {
    await fs.mkdir(logsPath, { recursive: true });
    const dataFilePath = path.join(logsPath, `${day}.json`);
    let content = { datas: [] };
    try {
      content = JSON.parse(await fs.readFile(dataFilePath, "utf8"));
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
    }
    if (content.datas.some((e) => e.url === report.url)) return false;
    content.datas.push(report);
    const tmpPath = `${dataFilePath}.tmp`;
    await fs.writeFile(tmpPath, JSON.stringify(content));
    await fs.rename(tmpPath, dataFilePath);
    return true;
  }

  async function generateReport(reportDatas, fileContent) {
    const day = today();
    const report = { ...reportDatas };
    const hasPayload = typeof fileContent === "string" && fileContent !== "";

    if (hasPayload && save.dpaste) {
      report.reportUrl = await dpaste(fileContent);
    }
    if (hasPayload && save.local) {
      report.file = await saveRemoteFile(
        report.fileInclusion,
        fileContent,
        day
      );
    }

    const isNew = await enqueue(() => appendToDailyLog(day, report));
    return { report, isNew };
  }

  return { generateReport };
}

module.exports = { createReporter };

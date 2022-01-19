const fs = require("fs");
const path = require("path");
const axios = require("axios");
const common = require("../common/common");
const config = require("../../config");

const today = new Date().toISOString().split("T")[0];
const dataFilePath = path.join(__dirname, `../../hive/logs/${today}.json`);
const remoteFileCopyPath = path.join(__dirname, `../../hive/files/${today}/`);

async function writeFileAsync(jsonContent, filePath) {
  await fs.writeFile(
    filePath,
    JSON.stringify(jsonContent),
    { flag: "w" },
    (err) => {
      if (err) throw err;
    }
  );
}

async function downloadRemoteFile(remoteUrl) {
  if (remoteUrl && remoteUrl !== "") {
    try {
      const splittedUrl = remoteUrl.split("/");
      const fileName = `${splittedUrl[splittedUrl.length - 1]}.bee`;
      const fileContent = await common.getRemoteFileContent(remoteUrl);

      if (!fs.existsSync(remoteFileCopyPath)) {
        fs.mkdirSync(remoteFileCopyPath);
      }
      writeFileAsync(fileContent, path.join(remoteFileCopyPath, fileName));
      return { fileName, pathName: today };
    } catch (err) {
      return { fileName: "", pathName: "" };
    }
  }
  return { fileName: "", pathName: "" };
}

async function dpaste(content) {
  try {
    const body = `content=${encodeURIComponent(content)}&syntax=json`;
    const response = await axios.post("https://dpaste.com/api/", body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data.replace("\n", "");
  } catch (error) {
    return "";
  }
}
async function generateReport(reportDatas) {
  const reportDatasCopy = { ...reportDatas };
  if (config.remoteFileSave.dpaste) {
    const fileContent = await common.getRemoteFileContent(
      reportDatas.fileInclusion
    );
    const reportUrl = await dpaste(fileContent);
    reportDatasCopy.reportUrl = reportUrl;
  }
  if (config.remoteFileSave.local) {
    const file = await downloadRemoteFile(reportDatas.fileInclusion);
    reportDatasCopy.file = file;
  }

  if (fs.existsSync(dataFilePath)) {
    fs.readFile(dataFilePath, "utf8", (err, data) => {
      if (err) throw err;
      const content = JSON.parse(data);
      if (content.datas.filter((e) => e.url === reportDatas.url).length === 0) {
        content.datas.push(reportDatasCopy);
        writeFileAsync(content, dataFilePath);
      }
    });
  } else {
    writeFileAsync({ datas: [reportDatasCopy] }, dataFilePath);
  }
}

const reportMaker = {
  generateReport,
};
module.exports = reportMaker;

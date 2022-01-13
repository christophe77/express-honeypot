const fs = require("fs");
const path = require("path");
const utils = require("../utils");

const hiveLogsPath = path.join(__dirname, "../hive/logs");
const hiveFilesPath = path.join(__dirname, "../hive/files");

const generateResults = () => {
  const darts = [];

  const jsonsInDir = fs
    .readdirSync(hiveLogsPath)
    .filter((file) => path.extname(file) === ".json");

  jsonsInDir.forEach((file) => {
    const dart = {
      date: path.parse(file).name,
      datas: [],
    };
    const dartData = fs.readFileSync(path.join(hiveLogsPath, file));
    const dartDataJson = JSON.parse(dartData.toString());
    dart.datas = dartDataJson.datas;
    darts.push(dart);
  });
  return darts;
};

function getDarts() {
  const darts = generateResults();
  return darts;
}

function deleteDayLog(date) {
  try {
    const logFile = path.join(hiveLogsPath, `${date}.json`);
    const filePath = path.join(hiveFilesPath, date);
    fs.unlinkSync(logFile);
    utils.deleteFolderRecursive(filePath);
    return { deleted: true };
  } catch (e) {
    return { deleted: false };
  }
}

const beekeeperController = {
  getDarts,
  deleteDayLog,
};
module.exports = beekeeperController;

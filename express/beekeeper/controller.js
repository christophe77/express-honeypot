const fs = require("fs");
const path = require("path");

const generateResults = () => {
  const hivePath = path.join(__dirname, "../hive/logs");
  const darts = [];

  const jsonsInDir = fs
    .readdirSync(hivePath)
    .filter((file) => path.extname(file) === ".json");

  jsonsInDir.forEach((file) => {
    const dart = {
      date: path.parse(file).name,
      datas: [],
    };
    const dartData = fs.readFileSync(path.join(hivePath, file));
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
const beekeeperController = {
  getDarts,
};
module.exports = beekeeperController;

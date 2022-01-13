const fs = require("fs");

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
function deleteFolderRecursive(thePath) {
  if (fs.existsSync(thePath)) {
    fs.readdirSync(thePath).forEach((file) => {
      const curPath = `${thePath}/${file}`;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(thePath);
  }
}
const utils = {
  writeFileAsync,
  deleteFolderRecursive,
};
module.exports = utils;

const fs = require("fs");
const path = require("path");
const { isValidDate, resolveInside } = require("../security/sanitize");

function createBeekeeperStore(storageDir) {
  const hiveLogsPath = path.join(storageDir, "logs");
  const hiveFilesPath = path.join(storageDir, "files");

  function getDarts() {
    if (!fs.existsSync(hiveLogsPath)) return [];
    return fs
      .readdirSync(hiveLogsPath)
      .filter((file) => path.extname(file) === ".json")
      .flatMap((file) => {
        try {
          const json = JSON.parse(
            fs.readFileSync(path.join(hiveLogsPath, file))
          );
          return [{ date: path.parse(file).name, datas: json.datas || [] }];
        } catch (e) {
          // One broken file should not take the whole dashboard down.
          return [];
        }
      });
  }

  function deleteDayLog(date) {
    if (!isValidDate(date)) return { deleted: false };
    try {
      fs.rmSync(path.join(hiveLogsPath, `${date}.json`), { force: true });
      fs.rmSync(path.join(hiveFilesPath, date), {
        recursive: true,
        force: true,
      });
      return { deleted: true };
    } catch (e) {
      return { deleted: false };
    }
  }

  // Returns the absolute path of a captured payload, or null if the request
  // smells like it is trying to read anything else. Yes, someone will try.
  function getPayloadPath(date, file) {
    if (!isValidDate(date) || typeof file !== "string") return null;
    if (path.basename(file) !== file || !file.endsWith(".bee")) return null;
    const filePath = resolveInside(hiveFilesPath, date, file);
    return filePath && fs.existsSync(filePath) ? filePath : null;
  }

  return { getDarts, deleteDayLog, getPayloadPath };
}

module.exports = { createBeekeeperStore };

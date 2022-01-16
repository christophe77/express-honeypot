const axios = require("axios");

async function getRemoteFileContent(remoteUrl) {
  const response = await axios.get(remoteUrl);
  return response.data;
}

const common = {
  getRemoteFileContent,
};
module.exports = common;

const axios = require("axios");

async function getRemoteFileContent(remoteUrl) {
  try {
    const response = await axios.get(remoteUrl);
    return response.data;
  } catch (error) {
    return {}
  }

}

const common = {
  getRemoteFileContent,
};
module.exports = common;

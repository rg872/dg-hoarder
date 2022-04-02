const { ipcRenderer } = require("electron");

async function fileInfo(channel, payload) {
  const { error, result } = await ipcRenderer.invoke(channel, payload);
  if (error) {
    throw new Error(error);
  }
  return result;
}

async function appConfig(channel, payload) {
  const { error, result } = await ipcRenderer.invoke(channel, payload);
  if (error) {
    throw new Error(error);
  }
  return result;
}

async function download(channel, payload) {
  const { error, result } = await ipcRenderer.invoke(channel, payload);
  if (error) {
    throw new Error(error);
  }
  return result;
}

module.exports = {
  fileInfo,
  appConfig,
  download,
};

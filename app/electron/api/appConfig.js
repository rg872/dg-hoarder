const { dialog, app, systemPreferences } = require("electron");
const Store = require("electron-store");
const errorHandler = require("../utils/error");

const store = new Store();

function setDefaultConfig() {
  try {
    const isConfigExist = !!Object.keys(store.store).length;
    if (!isConfigExist) {
      store.set("downloadFolder", app.getPath("downloads"));
    }
  } catch (error) {
    throw new Error(errorHandler(error));
  }
}

function getAppConfigSync() {
  try {
    return store.store;
  } catch (error) {
    throw new Error(errorHandler(error));
  }
}

async function getAppConfig() {
  try {
    const config = store.store;
    return { result: config };
  } catch (error) {
    return { error: errorHandler(error) };
  }
}

async function setDownloadFolder() {
  try {
    const currentPath = store.get("downloadFolder")
      ? store.get("downloadFolder")
      : app.getPath("downloads");

    const { canceled, filePaths } = await dialog.showOpenDialog({
      defaultPath: currentPath,
      buttonLabel: "Choose folder",
      title: "Choose where files will be downloaded",
      properties: ["openDirectory", "createDirectory"],
    });

    if (canceled) {
      store.set("downloadFolder", currentPath);
      return { result: currentPath };
    }

    store.set("downloadFolder", filePaths[0]);
    return { result: filePaths[0] };
  } catch (error) {
    return { error: errorHandler(error) };
  }
}

module.exports = {
  setDownloadFolder,
  getAppConfig,
  setDefaultConfig,
  getAppConfigSync,
};

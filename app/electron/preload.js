const { contextBridge } = require("electron");

const { fileInfo, appConfig, download } = require("./ipc/emitters");
const listener = require("./ipc/rendererListeners");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  fileInfo,
  appConfig,
  download,
  listener,
});

const { contextBridge, ipcRenderer } = require("electron");

const { getMovieList, getMovieDetail } = require("./api/ipc/emitters");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  getMovieList,
  getMovieDetail,
});

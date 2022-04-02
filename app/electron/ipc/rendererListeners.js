const { ipcRenderer } = require("electron");

function onTorrentReady(callback) {
  ipcRenderer.on("download/onTorrentReady", callback);
}

function onTorrentDownload(callback) {
  ipcRenderer.on("download/onTorrentDownload", callback);
}

function onTorrentUpload(callback) {
  ipcRenderer.on("download/onTorrentUpload", callback);
}

function onTorrentNewPeer(callback) {
  ipcRenderer.on("download/onTorrentNewPeer", callback);
}

function onTorrentNoPeers(callback) {
  ipcRenderer.on("download/onTorrentNoPeers", callback);
}

function onTorrentError(callback) {
  ipcRenderer.on("download/onTorrentError", callback);
}

function onTorrentDone(callback) {
  ipcRenderer.on("download/onTorrentDone", callback);
}

module.exports = {
  onTorrentReady,
  onTorrentDownload,
  onTorrentUpload,
  onTorrentNewPeer,
  onTorrentNoPeers,
  onTorrentError,
  onTorrentDone,
};

const path = require("path");
const fs = require("fs/promises");
const Webtorrent = require("webtorrent");
const Downloader = require("nodejs-file-downloader");

const errorHandler = require("../utils/error");
const formatBytes = require("../utils/bytes");
const { capitalizeString } = require("../utils/string");
const { getAppConfigSync } = require("./appConfig");

let torrentClient = null;
let webContents = null;

function initDownloadDeps(mainWebContents) {
  torrentClient = new Webtorrent();
  webContents = mainWebContents;

  torrentClient.on("error", (error) => {
    // Emitted when the client encounters a fatal error.
    // The client is automatically destroyed and all torrents
    // are removed and cleaned up when this occurs
    // TODO: add error handler and logger
  });

  return torrentClient;
}

function getTorrentInfo(torrent) {
  const result = {};
  if (torrent.path) result.folderPath = torrent.path;
  if (torrent.length) result.size = formatBytes(torrent.length);
  if (torrent.progress) result.progress = Math.floor(torrent.progress * 100);
  if (torrent.numPeers) result.peers = torrent.numPeers;
  if (torrent.infoHash) result.infoHash = torrent.infoHash;
  if (torrent.magnetURI) result.magnetUri = torrent.magnetURI;
  if (torrent.created) result.createdAt = torrent.created.toDateString();
  if (torrent.createdBy) result.createdBy = torrent.createdBy;
  if (torrent.comment) result.comment = torrent.comment;
  if (torrent.timeRemaining)
    result.remainingTime = new Date().getTime() + torrent.timeRemaining;
  if (torrent.downloadSpeed)
    result.downloadSpeed = formatBytes(torrent.downloadSpeed) + " / Secs";
  if (torrent.uploadSpeed)
    result.uploadSpeed = formatBytes(torrent.uploadSpeed) + " / Secs";

  return result;
}

function getDownloadPath(params) {
  const config = getAppConfigSync();
  const downloadPath = path.join(
    config.downloadFolder,
    `/${capitalizeString(params.type)}`,
    `/${capitalizeString(params.category)}`,
    `/${params.provider}`,
    `/${params.title}`
  );

  return downloadPath;
}

function initTorrentListener(id, torrent) {
  torrent.on("ready", () => {
    // Emitted when the torrent is ready to be used
    const payload = getTorrentInfo(torrent);
    payload.downloadStatus = "onprogress";

    webContents.send("download/onTorrentReady", id, payload);
  });

  torrent.on("download", (bytes) => {
    // Emitted whenever data is downloaded
    const payload = {
      peers: torrent.numPeers,
      progress: Math.floor(torrent.progress * 100),
      remainingTime: new Date().getTime() + torrent.timeRemaining,
      downloadSpeed: formatBytes(torrent.downloadSpeed) + " / Secs",
    };

    webContents.send("download/onTorrentDownload", id, payload);
  });

  torrent.on("upload", (bytes) => {
    // Emitted whenever data is uploaded
    const payload = {
      ratio: torrent.ratio,
      uploadSpeed: formatBytes(torrent.uploadSpeed) + " / Secs",
    };

    webContents.send("download/onTorrentUpload", id, payload);
  });

  torrent.on("wire", (wire, address) => {
    // Emitted whenever a new peer is connected for this torrent
    webContents.send("download/onTorrentNewPeer", id, {
      peers: torrent.numPeers,
    });
  });

  torrent.on("noPeers", (announcerType) => {
    // Emitted whenever a DHT, tracker, or LSD announce occurs,
    // but no peers have been found
    const payload = getTorrentInfo(torrent);

    webContents.send("download/onTorrentNoPeers", id, payload);
  });

  torrent.on("error", (error) => {
    // Emitted when the torrent encounters a fatal error
    const payload = getTorrentInfo(torrent);
    payload.downloadStatus = "error";

    webContents.send("download/onTorrentError", id, payload);
  });

  torrent.on("done", () => {
    // Emitted when all the torrent files have been downloaded
    const payload = getTorrentInfo(torrent);
    payload.downloadStatus = "seeding";
    // TODO: add error logger

    webContents.send("download/onTorrentDone", id, payload);
  });
}

async function addNewTorrentDownload(id, torrentUrl, params) {
  try {
    const downloadPath = getDownloadPath(params);
    await fs.mkdir(downloadPath, { recursive: true });

    // download the .torrent file
    const downloader = new Downloader({
      url: torrentUrl,
      directory: downloadPath,
      cloneFiles: false,
    });
    downloader.download();

    const torrent = torrentClient.add(torrentUrl, { path: downloadPath });
    initTorrentListener(id, torrent);

    // update db
    torrent.once("ready", () => {
      const payload = getTorrentInfo(torrent);
      payload.downloadStatus = "onprogress";
    });

    const result = getTorrentInfo(torrent);
    result.downloadStatus = "initialized";

    return { result };
  } catch (error) {
    return { error: errorHandler(error) };
  }
}

async function pauseTorrentDownload(infoHash) {
  try {
    const torrent = torrentClient.get(infoHash);
    torrent.destroy();

    const result = {
      downloadStatus: "paused",
      remainingTime: undefined,
      downloadSpeed: "0 / Secs",
      uploadSpeed: "0 / Secs",
      peers: 0,
    };

    return { result };
  } catch (error) {
    return { error: errorHandler(error) };
  }
}

async function resumeTorrentDownload(id, torrentUrl, params) {
  try {
    const torrent = torrentClient.add(torrentUrl, { path: params.folderPath });
    initTorrentListener(id, torrent);

    const result = getTorrentInfo(torrent);
    result.downloadStatus = "initialized";

    return { result };
  } catch (error) {
    return { error: errorHandler(error) };
  }
}

async function deleteTorrentDownload(infoHash, folderPath) {
  try {
    const torrent = torrentClient.get(infoHash);

    if (torrent) {
      torrentClient.remove(infoHash);
    }

    await fs.rm(folderPath, { recursive: true, force: true });

    return { result: {} };
  } catch (error) {
    return { error: errorHandler(error) };
  }
}

module.exports = {
  initDownloadDeps,
  addNewTorrentDownload,
  pauseTorrentDownload,
  resumeTorrentDownload,
  deleteTorrentDownload,
};

const { ipcMain } = require("electron");

const {
  getPublicDomainMovieList,
  getPublicDomainMovieDetail,
  getLegitTorrentsList,
  getLegitTorrentsDetail,
} = require("../api/fileInfo");

const { setDownloadFolder, getAppConfig } = require("../api/appConfig");
const {
  addNewTorrentDownload,
  resumeTorrentDownload,
  pauseTorrentDownload,
  deleteTorrentDownload,
} = require("../api/download");
const { insertNewFile, insertNewTorrent } = require("../api/sqlite");

// fileInfo
function fetchMovieListListener() {
  ipcMain.handle(
    "fileInfo/fetchMovieList",
    async (_, { providers, params }) => {
      const allMovieFetcher = [];
      const results = [];
      let isError = false;
      for (const provider of providers) {
        if (provider === "Public Domain Torrents") {
          const search = params && params.search ? params.search : "";
          allMovieFetcher.push(getPublicDomainMovieList(search));
        } else if (provider === "Legit Torrents") {
          const legitParams = params
            ? { ...params, category: "movie" }
            : { category: "movie" };
          allMovieFetcher.push(getLegitTorrentsList(legitParams));
        }
      }

      const responses = await Promise.allSettled(allMovieFetcher);
      for (res of responses) {
        if (res.status === "fulfilled" && res.value.result) {
          results.push(...res.value.result);
        } else if (
          res.status === "rejected" ||
          (res.status === "fulfilled" && res.value.error)
        ) {
          isError = true;
        }
      }

      if (isError && !results.length) {
        return { error: "no promise return value and there's an error" };
      } else {
        return { result: results };
      }
    }
  );
}

function fetchMovieDetailListener() {
  ipcMain.handle("fileInfo/fetchMovieDetail", (_, { provider, id }) => {
    if (provider === "Public Domain Torrents") {
      return getPublicDomainMovieDetail(id);
    } else if (provider === "Legit Torrents") {
      return getLegitTorrentsDetail(id);
    }
  });
}

// appConfig
function getAppConfigListener() {
  ipcMain.handle("appConfig/getAppConfig", () => getAppConfig());
}

function setDownloadFolderListener() {
  ipcMain.handle("appConfig/setDownloadFolder", () => setDownloadFolder());
}

// download
function addNewTorrentDownloadListener() {
  ipcMain.handle(
    "download/addNewTorrentDownload",
    async (_, { link, id, ...params }) => {
      try {
        const { error, result } = await addNewTorrentDownload(id, link, params);
        if (result) {
          insertNewTorrent({ id, link, source: "torrent", ...params }).catch(
            (errorInsertDb) => {
              // TODO: handle error insert to sqlite
              console.log("ERROR create new Torrent File");
              console.log(errorInsertDb);
            }
          );
          return { result };
        } else {
          return { error };
        }
      } catch (error) {
        return { error: "failed to add new torrent download" };
      }
    }
  );
}

function resumeTorrentDownloadListener() {
  ipcMain.handle(
    "download/resumeTorrentDownload",
    (_, { url, id, ...params }) => resumeTorrentDownload(id, url, params)
  );
}

function pauseTorrentDownloadListener() {
  ipcMain.handle("download/pauseTorrentDownload", (_, { infoHash }) =>
    pauseTorrentDownload(infoHash)
  );
}

function deleteTorrentDownloadListener() {
  ipcMain.handle(
    "download/deleteTorrentDownload",
    (_, { id, infoHash, folderPath }) =>
      deleteTorrentDownload(infoHash, folderPath)
  );
}

function ipcListener() {
  fetchMovieListListener();
  fetchMovieDetailListener();
  setDownloadFolderListener();
  getAppConfigListener();
  addNewTorrentDownloadListener();
  resumeTorrentDownloadListener();
  pauseTorrentDownloadListener();
  deleteTorrentDownloadListener();
}

module.exports = ipcListener;

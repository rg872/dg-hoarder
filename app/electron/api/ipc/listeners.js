const { ipcMain } = require("electron");

const {
  getPublicDomainMovieList,
  getPublicDomainMovieDetail,
  getLegitTorrentsList,
  getLegitTorrentsDetail,
} = require("../fetchList");

function ipcListener() {
  ipcMain.handle("getMovieList", (_, provider, params) => {
    if (provider === "public-domain-torrents") {
      return getPublicDomainMovieList();
    } else if (provider === "legit-torrents") {
      return getLegitTorrentsList(params);
    }
  });
  ipcMain.handle("getMovieDetail", (_, provider, id) => {
    if (provider === "public-domain-torrents") {
      return getPublicDomainMovieDetail(id);
    } else if (provider === "legit-torrents") {
      return getLegitTorrentsDetail(id);
    }
  });
}

module.exports = ipcListener;

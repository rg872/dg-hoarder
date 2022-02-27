const { ipcMain } = require("electron");

const {
  getPublicDomainMovieList,
  getPublicDomainMovieDetail,
  getLegitTorrentsList,
  getLegitTorrentsDetail,
} = require("../fetchList");

function ipcListener() {
  ipcMain.handle("getMovieList", async (_, providers, params) => {
    const allMovieFetcher = [];
    const results = [];
    let isError = false;
    for (const provider of providers) {
      if (provider === "Public Domain Torrents") {
        allMovieFetcher.push(getPublicDomainMovieList());
      } else if (provider === "Legit Torrents") {
        allMovieFetcher.push(getLegitTorrentsList(params));
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
  });
  ipcMain.handle("getMovieDetail", (_, provider, id) => {
    if (provider === "Public Domain Torrents") {
      return getPublicDomainMovieDetail(id);
    } else if (provider === "Legit Torrents") {
      return getLegitTorrentsDetail(id);
    }
  });
}

module.exports = ipcListener;

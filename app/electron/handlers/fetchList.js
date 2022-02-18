const axios = require("axios");
const cheerio = require("cheerio");
const { ipcMain, ipcRenderer } = require("electron");
const { encodeError, decodeError } = require("./utils/errror");

const publicDomainMoviesUrl = "http://www.publicdomaintorrents.info";

async function getPublicDomainMovies() {
  try {
    let result = [];

    const { data: pageHtml } = await axios.get(
      `${publicDomainMoviesUrl}/nshowcat.html`,
      {
        params: { category: "ALL" },
      }
    );

    const pageSelector = cheerio.load(pageHtml);
    const detailLinkEls = pageSelector('a[href*="nshowmovie"]');

    detailLinkEls.each((_, detailLinkEl) => {
      const detailUrl = new URL(
        `${publicDomainMoviesUrl}/${pageSelector(detailLinkEl).attr("href")}`
      );
      const movieId = detailUrl.searchParams.get("movieid");
      result.push({
        title: pageSelector(detailLinkEl).text(),
        detail_id: movieId,
      });
    });

    return { result };
  } catch (error) {
    return { error: encodeError(error) };
  }
}

async function getPublicDomainMovieDetail(detail_id) {
  try {
    const result = {};
    result.link = [];

    const { data: detailPageHtml } = await axios.get(
      `${publicDomainMoviesUrl}/nshowmovie.html`,
      { params: { movieid: detail_id } }
    );
    const pageSelector = cheerio.load(detailPageHtml);
    const titleEl = pageSelector("td>h3");
    const descEl = pageSelector("h1+table tr:nth-child(3)>td:nth-child(2)");
    const dlLinkELs = pageSelector('a[href*=".torrent"]');

    result.title = pageSelector(titleEl).text();
    result.desc = pageSelector(descEl).text();

    dlLinkELs.each((i, dlLinkEl) => {
      result.link.push({
        label: pageSelector(dlLinkEl)
          .text()
          .replace(/(\d{1,6}|\d[,.]\d{1,3})\s?(MB|GB)/, ""),
        url: pageSelector(dlLinkEl).attr("href"),
        size: pageSelector(dlLinkEl)
          .text()
          .match(/(\d{1,6}|\d[,.]\d{1,3})\s?(MB|GB)/)[0],
      });
    });

    return { result };
  } catch (error) {
    return { error: encodeError(error) };
  }
}

function invokeListeners() {
  ipcMain.handle("fetchlist/getPublicDomainMovies", getPublicDomainMovies);
  ipcMain.handle("fetchlist/getPublicDomainMovieDetail", (_, detail_id) =>
    getPublicDomainMovieDetail(detail_id)
  );
}

const fetchListEmitters = {
  getPublicDomainMovies: async () => {
    const { error, result } = await ipcRenderer.invoke(
      "fetchlist/getPublicDomainMovies"
    );
    if (error) {
      throw decodeError(error);
    }
    return result;
  },
  getPublicDomainMovieDetail: async (detail_id) => {
    const { error, result } = await ipcRenderer.invoke(
      "fetchlist/getPublicDomainMovieDetail",
      detail_id
    );
    if (error) {
      throw decodeError(error);
    }
    return result;
  },
};

module.exports = {
  fetchListEmitters,
  fetchListListeners: invokeListeners,
};

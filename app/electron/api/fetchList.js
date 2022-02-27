const axios = require("axios");
const cheerio = require("cheerio");
const errorHandler = require("./utils/error");

const publicDomainMoviesUrl = "http://www.publicdomaintorrents.info";
const leggitTorrentsUrl = "http://www.legittorrents.info";

async function getPublicDomainMovieList() {
  try {
    let result = [];

    const { data: pageHtml } = await axios.get(
      `${publicDomainMoviesUrl}/nshowcat.html`,
      {
        params: { category: "ALL" },
      }
    );

    const $ = cheerio.load(pageHtml);
    const detailLinksChe = $('a[href*="nshowmovie"]');

    detailLinksChe.each((_, detailLinkEl) => {
      const detailUrl = new URL(
        `${publicDomainMoviesUrl}/${detailLinkEl.attribs["href"]}`
      );
      const movieId = detailUrl.searchParams.get("movieid");
      result.push({
        title: $(detailLinkEl).text().trim(),
        id: movieId,
        provider: "Public Domain Torrents",
      });
    });

    return { result };
  } catch (error) {
    return { error: errorHandler(error) };
  }
}

async function getPublicDomainMovieDetail(id) {
  try {
    if (!id) throw new Error("id cant be empty");

    const result = {};
    result.link = [];

    const { data: pageHtml } = await axios.get(
      `${publicDomainMoviesUrl}/nshowmovie.html`,
      { params: { movieid: id } }
    );
    const $ = cheerio.load(pageHtml);
    const titleChe = $("td>h3");
    const descChe = $("h1+table tr:nth-child(3)>td:nth-child(2)");
    const dlLinksChe = $('a[href*=".torrent"]');

    result.id = `public-domain-torrents-${id}`;
    result.provider = "Public Domain Torrents";
    result.title = titleChe.text().trim();
    result.desc = descChe.text().trim();

    dlLinksChe.each((i, dlLinkEl) => {
      result.link.push({
        label: $(dlLinkEl)
          .text()
          .replace(/(\d{1,6}|\d[,.]\d{1,3})\s?(MB|GB)/, "")
          .trim(),
        url: dlLinkEl.attribs["href"],
        size: $(dlLinkEl)
          .text()
          .match(/(\d{1,6}|\d[,.]\d{1,3})\s?(MB|GB)/)[0]
          .trim(),
      });
    });

    return { result };
  } catch (error) {
    return { error: errorHandler(error) };
  }
}

async function getLegitTorrentsList(params = {}) {
  try {
    let result = [];

    switch (params.category) {
      case "movie":
        params.category = "1";
        break;
      case "music":
        params.category = "2";
        break;
      default:
        throw new Error("Category can't be empty");
    }

    switch (params.order) {
      case "seed":
        params.order = "5";
        break;
      case "name":
        params.order = "2";
        break;
      case "date":
        params.order = "3";
        break;
      default:
        params.order = "5";
        break;
    }

    switch (params.by) {
      case "asc":
        params.by = "1";
        break;
      case "desc":
        params.by = "2";
        break;
      default:
        params.by = "2";
        break;
    }

    // this will also change 0 and below to "1"
    params.pages = params.pages ? String(params.pages) : "1";

    const { data: pageHtml } = await axios.get(
      `${leggitTorrentsUrl}/index.php`,
      {
        params: { page: "torrents", active: "1", ...params },
      }
    );

    const $ = cheerio.load(pageHtml);
    const detailLinksChe = $('a[href*="page=torrent-detail"]');

    // return empty array as result if no link found
    if (!detailLinksChe.length) return { result };

    detailLinksChe.each((_, detailLinkEl) => {
      const detailUrl = new URL(
        `${leggitTorrentsUrl}/${detailLinkEl.attribs["href"]}`
      );
      const id = detailUrl.searchParams.get("id");
      result.push({
        title: $(detailLinkEl).text(),
        id: id,
        provider: "Legit Torrents",
      });
    });

    return { result };
  } catch (error) {
    return { error: errorHandler(error) };
  }
}

async function getLegitTorrentsDetail(id) {
  try {
    if (!id) throw new Error("id cant be empty");

    const result = {};

    const { data: pageHtml } = await axios.get(
      `${leggitTorrentsUrl}/index.php`,
      { params: { page: "torrent-details", id } }
    );
    const $ = cheerio.load(pageHtml);
    const tdHeadersChe = $('div[align="center"]>table>tbody>tr>td.header');

    result.id = `legit-torrents-${id}`;
    result.provider = "Legit Torrents";

    tdHeadersChe.each((_, tdHeaderEl) => {
      const row_title = $(tdHeaderEl).text().trim();
      if (row_title === "Name") {
        result.title = $(tdHeaderEl).next().text();
      } else if (row_title === "Torrent") {
        result.link =
          leggitTorrentsUrl +
          "/" +
          $(tdHeaderEl).next().children().first().attr("href");
      } else if (row_title === "Description") {
        result.desc = $(tdHeaderEl).next().text();
      } else if (row_title === "Size") {
        result.size = $(tdHeaderEl).next().text();
      } else if (row_title === "AddDate") {
        result.uploadedAt = $(tdHeaderEl).next().text();
      } else if (row_title === "peers") {
        // TODO: extract from seed and peers from text, too lazy right now
      }
    });

    return { result };
  } catch (error) {
    return { error: errorHandler(error) };
  }
}

module.exports = {
  getPublicDomainMovieList,
  getPublicDomainMovieDetail,
  getLegitTorrentsList,
  getLegitTorrentsDetail,
};

const axios = require("axios");
const cheerio = require("cheerio");
const errorHandler = require("./utils/error");

const public_domain_movies_url = "http://www.publicdomaintorrents.info";
const leggit_torrents_url = "http://www.legittorrents.info";

async function getPublicDomainMovieList() {
  try {
    let result = [];

    const { data: page_html } = await axios.get(
      `${public_domain_movies_url}/nshowcat.html`,
      {
        params: { category: "ALL" },
      }
    );

    const $ = cheerio.load(page_html);
    const detail_links_che = $('a[href*="nshowmovie"]');

    detail_links_che.each((_, detail_link_el) => {
      const detail_url = new URL(
        `${public_domain_movies_url}/${detail_link_el.attribs["href"]}`
      );
      const movie_id = detail_url.searchParams.get("movieid");
      result.push({
        title: $(detail_link_el).text().trim(),
        id: movie_id,
        provider: "public-domain-torrents",
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

    const { data: page_html } = await axios.get(
      `${public_domain_movies_url}/nshowmovie.html`,
      { params: { movieid: id } }
    );
    const $ = cheerio.load(page_html);
    const title_che = $("td>h3");
    const desc_che = $("h1+table tr:nth-child(3)>td:nth-child(2)");
    const dl_links_che = $('a[href*=".torrent"]');

    result.id = `public-domain-torrents-${id}`;
    result.provider = "public-domain-torrents";
    result.title = title_che.text().trim();
    result.desc = desc_che.text().trim();

    dl_links_che.each((i, dl_link_el) => {
      result.link.push({
        label: $(dl_link_el)
          .text()
          .replace(/(\d{1,6}|\d[,.]\d{1,3})\s?(MB|GB)/, "")
          .trim(),
        url: dl_link_el.attribs["href"],
        size: $(dl_link_el)
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

    const { data: page_html } = await axios.get(
      `${leggit_torrents_url}/index.php`,
      {
        params: { page: "torrents", active: "1", ...params },
      }
    );

    const $ = cheerio.load(page_html);
    const detail_links_che = $('a[href*="page=torrent-detail"]');

    // return empty array as result if no link found
    if (!detail_links_che.length) return { result };

    detail_links_che.each((_, detail_link_el) => {
      const detail_url = new URL(
        `${leggit_torrents_url}/${detail_link_el.attribs["href"]}`
      );
      const id = detail_url.searchParams.get("id");
      result.push({
        title: $(detail_link_el).text(),
        id: id,
        provider: "legit-torrents",
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

    const { data: page_html } = await axios.get(
      `${leggit_torrents_url}/index.php`,
      { params: { page: "torrent-details", id } }
    );
    const $ = cheerio.load(page_html);
    const td_headers_che = $('div[align="center"]>table>tbody>tr>td.header');

    result.id = `legit-torrents-${id}`;
    result.provider = "legit-torrents";

    td_headers_che.each((_, td_header_el) => {
      const row_title = $(td_header_el).text().trim();
      if (row_title === "Name") {
        result.title = $(td_header_el).next().text();
      } else if (row_title === "Torrent") {
        result.link =
          leggit_torrents_url +
          "/" +
          $(td_header_el).next().children().first().attr("href");
      } else if (row_title === "Description") {
        result.desc = $(td_header_el).next().text();
      } else if (row_title === "Size") {
        result.size = $(td_header_el).next().text();
      } else if (row_title === "AddDate") {
        result.uploaded_at = $(td_header_el).next().text();
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

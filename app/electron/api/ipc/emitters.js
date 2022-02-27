const { ipcRenderer } = require("electron");

async function getMovieList(providers, params) {
  const { error, result } = await ipcRenderer.invoke(
    "getMovieList",
    providers,
    params
  );
  if (error && !result) {
    throw new Error("Oops, something wrong happened when fetching movie list");
  }
  return result;
}

async function getMovieDetail(provider, id) {
  const { error, result } = await ipcRenderer.invoke(
    "getMovieDetail",
    provider,
    id
  );
  if (error) {
    throw new Error(
      "Oops, something wrong happened when fetching movie detail"
    );
  }
  return result;
}

module.exports = {
  getMovieList,
  getMovieDetail,
};

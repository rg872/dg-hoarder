const { ipcRenderer } = require("electron");

async function getMovieList(provider, params) {
  const { error, result } = await ipcRenderer.invoke(
    "getMovieList",
    provider,
    params
  );
  if (error) {
    throw new Error(error);
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
    throw new Error(error);
  }
  return result;
}

module.exports = {
  getMovieList,
  getMovieDetail,
};

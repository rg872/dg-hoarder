/*
  for now electron cant handle custom error
  https://github.com/electron/electron/issues/24427

  we only create error message and not throwing error,
  give ipcRenderer more flexibility to handle error on client side
*/

function errorHandler(err) {
  // TODO: create error logger file
  if (err.isAxiosError) {
    // handle Axios error
    return axiosErrorHandler(err);
  } else {
    // console.log("ERROR", err);
    return `${err.name} ${err.message}`;
  }
}

function axiosErrorHandler(err) {
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx

    // console.log("AXIOS RESPONSE ERROR DATA", err.response.data);
    return `AXIOS RESPONSE ERROR ${err.code}, (status:${err.response.status}) ${err.response.statusText}`;
  } else if (err.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js

    // console.log("AXIOS REQUEST ERROR REQUEST", err);
    return `AXIOS REQUEST ERROR ${err.code}`;
  } else {
    // Something happened in setting up the request that triggered an Error

    // console.log("AXIOS ERROR", err);
    return `AXIOS ERROR ${err.name}, ${err.message}`;
  }
}

module.exports = errorHandler;

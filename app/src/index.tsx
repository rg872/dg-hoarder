import React from "react";
import ReactDOM from "react-dom";

import "bulma/css/bulma.css";

import { Api } from "Types/api";

declare global {
  interface Window {
    api: Api;
  }
}

function fetchMe() {
  window.api.getMovieList("public-domain-torrents").then((result) => {
    window.api
      .getMovieDetail("public-domain-torrents", result[0].id)
      .then((res) => {
        console.log(res);
      });
  });
}

ReactDOM.render(
  <div>
    <button onClick={fetchMe}>FETCH ME</button>
  </div>,
  document.getElementById("target")
);

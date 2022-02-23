import React from "react";
import ReactDOM from "react-dom";

import { Api } from "./types/api";

import Root from "./core/root";

import "@picocss/pico";

declare global {
  interface Window {
    api: Api;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("target")
);

import React from "react";
import ReactDOM from "react-dom";

import { Api } from "Types/api";

import "@picocss/pico";
import "./index.css";

declare global {
  interface Window {
    api: Api;
  }
}

ReactDOM.render(<div>WOW</div>, document.getElementById("target"));

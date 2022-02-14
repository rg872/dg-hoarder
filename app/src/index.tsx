import React from "react";
import ReactDOM from "react-dom";

import "bulma/css/bulma.css";

import { IApi } from "Types/api";

declare global {
  interface Window {
    api: IApi;
  }
}

ReactDOM.render(<div>HELLO</div>, document.getElementById("target"));

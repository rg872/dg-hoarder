import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./state/store";

import Root from "./core/root";

import "@picocss/pico";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById("target")
);

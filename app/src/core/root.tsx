import React from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "../state/store";

import type Api from "./types/api";
import type { FunctionComponent } from "react";

import Navbar from "./navbar";
import Pages from "./pages";

import "@picocss/pico";
import "./styles/root.css";

declare global {
  interface Window {
    api: Api;
  }
}

const Root: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Navbar />
        <Pages />
      </HashRouter>
    </Provider>
  );
};

export default Root;

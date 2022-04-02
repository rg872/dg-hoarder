import React from "react";
import { HashRouter } from "react-router-dom";

import type Api from "./types/api";

import Navbar from "./navbar";
import AppRoutes from "./routes";
import { useAppDispatch } from "../hooks/redux";
import { getAppConfig } from "../state/config/slice-config";

import { HistoryRouter as Router } from "redux-first-history/rr6";
import { history } from "../state/store";

declare global {
  interface Window {
    api: Api;
  }
}

const Root = () => {
  const dispatch = useAppDispatch();

  dispatch(getAppConfig());

  return (
    <Router history={history}>
      <Navbar />
      <AppRoutes />
    </Router>
  );
};

export default Root;

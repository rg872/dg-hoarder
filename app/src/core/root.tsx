import React, { FunctionComponent } from "react";
import { Provider } from "react-redux";
import { HistoryRouter as Router } from "redux-first-history/rr6";

import { history, store } from "../redux/store";

import Navbar from "./navbar";
import Pages from "./pages";

import "./styles/root.css";

const Root: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Navbar />
        <Pages />
      </Router>
    </Provider>
  );
};

export default Root;

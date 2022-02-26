import React, { FunctionComponent } from "react";
import { HashRouter } from "react-router-dom";

import Navbar from "./navbar";
import Pages from "./pages";

import "./styles/root.css";

const Root: FunctionComponent = () => {
  return (
    <HashRouter>
      <Navbar />
      <Pages />
    </HashRouter>
  );
};

export default Root;

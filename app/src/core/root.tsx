import React, { FunctionComponent } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./navbar";

import Pages from "./pages";

import "./root.css";

const Root: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Pages />
    </BrowserRouter>
  );
};

export default Root;

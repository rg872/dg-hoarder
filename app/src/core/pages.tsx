import React, { FunctionComponent, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Loading from "../pages/loading";

const Browse = lazy(
  () => import(/* webpackChunkName: "browser.chunk" */ "../pages/browse")
);

const Download = lazy(
  () => import(/* webpackChunkName: "download.chunk" */ "../pages/download")
);

const Organize = lazy(
  () => import(/* webpackChunkName: "organize.chunk" */ "../pages/organize")
);

const Pages: FunctionComponent = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/download" element={<Download />} />
        <Route path="/organize" element={<Organize />} />
      </Routes>
    </Suspense>
  );
};

export default Pages;

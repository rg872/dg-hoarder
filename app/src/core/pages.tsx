import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import type { FunctionComponent } from "react";

import PageLoading from "../pages/loading/page-loading";

const PageBrowse = lazy(
  () =>
    import(
      /* webpackChunkName: "browser.chunk" */ "../pages/browse/page-browse"
    )
);

const PageDownload = lazy(
  () =>
    import(
      /* webpackChunkName: "download.chunk" */ "../pages/download/page-download"
    )
);

const PageOrganize = lazy(
  () =>
    import(
      /* webpackChunkName: "organize.chunk" */ "../pages/organize/page-organize"
    )
);

const Pages: FunctionComponent = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route path="/" element={<PageBrowse />} />
        <Route path="/download" element={<PageDownload />} />
        <Route path="/organize" element={<PageOrganize />} />
      </Routes>
    </Suspense>
  );
};

export default Pages;

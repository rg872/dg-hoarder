import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import PageLoading from "../pages/loading/page-loading";

const PageDiscover = lazy(
  () =>
    import(
      /* webpackChunkName: "discover.chunk" */ "../pages/discover/page-discover"
    )
);

const PageDiscoverList = lazy(
  () =>
    import(
      /* webpackChunkName: "discoverList.chunk" */ "../pages/discover-list/page-discover-list"
    )
);

const PageDiscoverDetail = lazy(
  () =>
    import(
      /* webpackChunkName: "discoverDetail.chunk" */ "../pages/discover-detail/page-discover-detail"
    )
);

const PageDownload = lazy(
  () =>
    import(
      /* webpackChunkName: "download.chunk" */ "../pages/download/page-download"
    )
);

const PagePlay = lazy(
  () => import(/* webpackChunkName: "play.chunk" */ "../pages/play/page-play")
);

const PageSettings = lazy(
  () =>
    import(
      /* webpackChunkName: "settings.chunk" */ "../pages/settings/page-settings"
    )
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route path="/" element={<Navigate replace to="/discover" />} />

        <Route path="/discover" element={<PageDiscover />} />
        <Route path="/discover/list" element={<PageDiscoverList />} />
        <Route path="/discover/detail" element={<PageDiscoverDetail />} />
        <Route path="/download" element={<PageDownload />} />
        <Route path="/play" element={<PagePlay />} />
        <Route path="/settings" element={<PageSettings />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

import React from "react";

import DiscoverCategorySection from "../../components/discover-category-section/component-discover-category-section";

import Styles from "./page-discover.css";

const mediaTypes: ["video", "audio"] = ["video", "audio"];

const PageDiscover = () => {
  return (
    <main className="container-fluid">
      {mediaTypes.map((type) => (
        <DiscoverCategorySection type={type} key={type} />
      ))}
    </main>
  );
};

export default PageDiscover;

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setDownloadFolder } from "../../state/config/slice-config";

import Styles from "./page-settings.css";

const PageSettings = () => {
  const dispatch = useAppDispatch();
  const config = useAppSelector((state) => state.config);

  return (
    <main className="container-fluid">
      <article className={Styles.configItem}>
        Download Folder: {config.downloadFolder}
        <span role="button" onClick={() => dispatch(setDownloadFolder())}>
          Change
        </span>
      </article>
    </main>
  );
};

export default PageSettings;

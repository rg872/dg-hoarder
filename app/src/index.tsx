import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import i18nConfig from "I18n/i18n.config";
import { I18nextProvider } from "react-i18next";
import Root from "Core/root";
import store, { history } from "Redux/store/store";

import "bulma/css/bulma.css";

import { IApi } from "Types/api";

declare global {
  interface Window {
    api: IApi;
  }
}

ReactDOM.render(
  <I18nextProvider i18n={i18nConfig}>
    <Suspense fallback="loading">
      <Root store={store} history={history}></Root>
    </Suspense>
  </I18nextProvider>,
  document.getElementById("target")
);

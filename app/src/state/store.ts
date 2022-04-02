import { configureStore } from "@reduxjs/toolkit";

import { discoverApi } from "./discover/api-discover";
import discoverReducer from "./discover/slice-discover";
import fileReducer from "./file/slice-file";
import configReducer from "./config/slice-config";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
  });

const store = configureStore({
  reducer: {
    router: routerReducer,
    config: configReducer,
    file: fileReducer,
    discover: discoverReducer,
    [discoverApi.reducerPath]: discoverApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(discoverApi.middleware)
      .concat(routerMiddleware),
  devTools: false,
});

export const history = createReduxHistory(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

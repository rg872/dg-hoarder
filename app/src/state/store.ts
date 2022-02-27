import { configureStore } from "@reduxjs/toolkit";

import { discoverApi } from "./discover/api-discover";
import fileReducer from "./file/slice-file";

const store = configureStore({
  reducer: {
    file: fileReducer,
    [discoverApi.reducerPath]: discoverApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(discoverApi.middleware),
  devTools: false,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

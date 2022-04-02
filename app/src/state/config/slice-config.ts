import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { Config } from "./type-config";

const initialState: Config = {
  downloadFolder: "",
};

const getAppConfig = createAsyncThunk(
  "config/getAppConfig",
  async (thunkAPI) => {
    const config = await window.api.appConfig<Config>("appConfig/getAppConfig");
    return config;
  }
);

const setDownloadFolder = createAsyncThunk(
  "config/setDownloadFolder",
  async (thunkAPI) => {
    const newConfig = await window.api.appConfig<string>(
      "appConfig/setDownloadFolder"
    );
    return newConfig;
  }
);

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAppConfig.fulfilled, (state, action) => {
      return (state = action.payload);
    });
    builder.addCase(setDownloadFolder.fulfilled, (state, action) => {
      state.downloadFolder = action.payload;
    });
  },
});

export { getAppConfig, setDownloadFolder };

export default configSlice.reducer;

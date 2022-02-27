import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import type { DiscoveredFile, TorrentFile } from "./type-file";

export const filesAdapter = createEntityAdapter<DiscoveredFile | TorrentFile>({
  sortComparer: (fileA, fileB) => fileA.title.localeCompare(fileB.title),
});

const fileSlice = createSlice({
  name: "file",
  initialState: filesAdapter.getInitialState(),
  reducers: {},
});

export const {} = fileSlice.actions;

export default fileSlice.reducer;

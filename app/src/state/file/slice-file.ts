import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { push } from "redux-first-history";

import type { TorrentFile } from "../discover/type-discover";

import type {
  HoardedFile,
  HoardedTorrentFile,
  UpdateHoardedTorrentFile,
  UpdateHoardedTorrentFileChanges,
} from "./type-file";

const addNewTorrentDownload = createAsyncThunk(
  "file/addNewTorrentDownload",
  async (
    torrentFile: TorrentFile & { link: string },
    thunkAPI
  ): Promise<HoardedTorrentFile> => {
    const data = await window.api.download<HoardedTorrentFile>(
      "download/addNewTorrentDownload",
      {
        id: torrentFile.id,
        link: torrentFile.link,
        category: torrentFile.category,
        provider: torrentFile.provider,
        type: torrentFile.type,
        title: torrentFile.title,
      }
    );
    thunkAPI.dispatch(push("/download"));
    return { ...torrentFile, ...data };
  }
);

const resumeTorrentDownload = createAsyncThunk(
  "file/resumeTorrentDownload",
  async (payload: {
    id: string;
    url: string;
    folderPath: string;
  }): Promise<UpdateHoardedTorrentFile> => {
    const data = await window.api.download<UpdateHoardedTorrentFileChanges>(
      "download/resumeTorrentDownload",
      payload
    );
    return { id: payload.id, changes: data };
  }
);

const pauseTorrentDownload = createAsyncThunk(
  "file/pauseTorrentDownload",
  async (payload: {
    id: string;
    infoHash: string;
  }): Promise<UpdateHoardedTorrentFile> => {
    const data = await window.api.download<UpdateHoardedTorrentFileChanges>(
      "download/pauseTorrentDownload",
      { infoHash: payload.infoHash }
    );
    return { id: payload.id, changes: data };
  }
);

const deleteTorrentDownload = createAsyncThunk(
  "file/deleteTorrentDownload",
  async (payload: { id: string; infoHash: string; folderPath: string }) => {
    const data = await window.api.download<UpdateHoardedTorrentFileChanges>(
      "download/deleteTorrentDownload",
      { infoHash: payload.infoHash, folderPath: payload.folderPath }
    );
    return { id: payload.id, changes: data };
  }
);

export const fileAdapter = createEntityAdapter<
  HoardedFile | HoardedTorrentFile
>({
  sortComparer: (fileA, fileB) => fileA.title.localeCompare(fileB.title),
});

const fileSlice = createSlice({
  name: "file",
  initialState: fileAdapter.getInitialState(),
  reducers: {
    updateTorrentDownload: (
      state,
      action: PayloadAction<UpdateHoardedTorrentFile>
    ) => {
      fileAdapter.updateOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addNewTorrentDownload.fulfilled, (state, action) => {
      fileAdapter.addOne(state, action.payload);
    });
    builder.addCase(resumeTorrentDownload.fulfilled, (state, action) => {
      fileAdapter.updateOne(state, action.payload);
    });
    builder.addCase(pauseTorrentDownload.fulfilled, (state, action) => {
      fileAdapter.updateOne(state, action.payload);
    });
    builder.addCase(deleteTorrentDownload.fulfilled, (state, action) => {
      fileAdapter.removeOne(state, action.payload.id);
    });
  },
});

export {
  addNewTorrentDownload,
  resumeTorrentDownload,
  pauseTorrentDownload,
  deleteTorrentDownload,
};
export const { updateTorrentDownload } = fileSlice.actions;

export default fileSlice.reducer;

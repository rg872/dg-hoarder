import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fileAdapter } from "./slice-file";

export const fileSelectors = fileAdapter.getSelectors<RootState>(
  (state) => state.file
);

export const selectDownloadFiles = createSelector(
  fileSelectors.selectAll,
  (hoardedFiles) =>
    hoardedFiles.filter((hFile) => hFile.downloadStatus !== "done")
);

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AudioCategory,
  VideoCategory,
  MusicProvider,
  MovieProvider,
} from "./type-discover";

interface DiscoverState {
  selectedCategory: AudioCategory | VideoCategory;
  selectedDiscoverId: string;
  selectedProvider: MovieProvider | MusicProvider;
}

const initialState: DiscoverState = {
  selectedCategory: "movie",
  selectedDiscoverId: "",
  selectedProvider: "Public Domain Torrents",
};

const discoverSlice = createSlice({
  name: "discover",
  initialState,
  reducers: {
    selectCategory: (
      state,
      action: PayloadAction<AudioCategory | VideoCategory>
    ) => {
      state.selectedCategory = action.payload;
    },
    selectProvider: (
      state,
      action: PayloadAction<MovieProvider | MusicProvider>
    ) => {
      state.selectedProvider = action.payload;
    },
    selecteDiscoverId: (state, action: PayloadAction<string>) => {
      state.selectedDiscoverId = action.payload;
    },
  },
});

export const { selectCategory, selectProvider, selecteDiscoverId } =
  discoverSlice.actions;

export default discoverSlice.reducer;

import store from "../store";
import { filesAdapter } from "./slice-file";

import type { RootState } from "../store";

const filesSelectors = filesAdapter.getSelectors<RootState>(
  (state) => state.file
);

export const allFile = filesSelectors.selectAll(store.getState());

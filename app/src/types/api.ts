import * as File from "./file";

export interface Api {
  getMovieList: (
    provider: File.Provider,
    params?: File.LegitTorrentParams & { category: "movie" }
  ) => Promise<File.DiscoveredFile[]>;
  getMovieDetail: (
    provider: File.Provider,
    id: string
  ) => Promise<File.TorrentFile>;
}

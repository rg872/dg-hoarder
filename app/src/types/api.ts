import * as Discover from "./discover";

export interface Api {
  getMovieList: (
    provider: Discover.Provider,
    params?: Discover.LegitTorrentParams & { category: "movie" }
  ) => Promise<Discover.Downloadable[]>;
  getMovieDetail: (
    provider: Discover.Provider,
    id: string
  ) => Promise<Discover.Torrent>;
}

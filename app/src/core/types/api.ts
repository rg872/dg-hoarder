import type * as Discover from "../../state/discover/type-discover";

export default interface Api {
  getMovieList: (
    providers: Discover.Provider[],
    params?: Discover.DiscoverParams & { category: "movie" }
  ) => Promise<Discover.DiscoveredFile[]>;
  getMovieDetail: (
    provider: Discover.Provider,
    id: string
  ) => Promise<Discover.TorrentFile>;
}

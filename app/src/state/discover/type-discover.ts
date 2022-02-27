export type Provider = "Public Domain Torrents" | "Legit Torrents";

export interface DiscoveredFile {
  id: string;
  title: string;
  provider: Provider;
}

export interface TorrentLink {
  label: string;
  url: string;
  size?: string;
  seeds?: number;
  peers?: number;
  uploadedAt?: string;
  age?: string;
}

export interface TorrentFile extends DiscoveredFile {
  link: string | TorrentLink[];
  desc?: string;
  // if link is an array, all properties below will be included in link array
  size?: string;
  seeds?: number;
  peers?: number;
  uploadedAt?: string;
  age?: string;
}

export interface DiscoverParams {
  category: "movie" | "music";
  order: "seed" | "name" | "date";
  by: "asc" | "desc";
  pages: number;
  search: string;
}

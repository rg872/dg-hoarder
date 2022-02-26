export type Provider = "public-domain-torrents" | "legit-torrents";

export interface Downloadable {
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
  uploaded_at?: string;
  age?: string;
}

export interface Torrent extends Downloadable {
  link: string | TorrentLink[];
  desc?: string;
  // if link is an array, all properties below will be included in link array
  size?: string;
  seeds?: number;
  peers?: number;
  uploaded_at?: string;
  age?: string;
}

export interface LegitTorrentParams {
  category: "movie" | "music";
  order: "seed" | "name" | "date";
  by: "asc" | "desc";
  pages: number;
  search: string;
}

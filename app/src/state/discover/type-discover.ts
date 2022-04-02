export type FileType = "video" | "audio";
export type FileSource = "torrent" | "download";
export type VideoCategory = "movie" | "youtube" | "concert";
export type AudioCategory = "music" | "audiobook";
export type MovieProvider = "Public Domain Torrents" | "Legit Torrents";
export type MusicProvider = "Legit Torrents";

export interface DiscoveredFile {
  id: string;
  title: string;
  type: FileType;
  source: FileSource;
  category: VideoCategory | AudioCategory;
  provider: MovieProvider | MusicProvider;
}

export interface TorrentLink {
  label: string;
  url: string;
  size?: string;
  seeds?: number;
  peers?: number;
  uploadedAt?: string;
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

export interface DownloadFile extends DiscoveredFile {
  link: string;
  desc?: string;
  size?: string;
  uploadedAt?: string;
  age?: string;
}

export interface MovieParams {
  order?: "seed" | "name" | "date";
  by?: "asc" | "desc";
  pages?: number;
  search: string;
}

export interface MusicParams {
  order?: "seed" | "name" | "date";
  by?: "asc" | "desc";
  pages?: number;
  search: string;
}

export type Channel = "fileInfo/fetchMovieList" | "fileInfo/fetchMovieDetail";

export interface fetchPayload {
  provider?: MovieProvider | MusicProvider;
  providers?: MovieProvider[] | MusicProvider[];
  id?: string;
  params?: MovieParams | MusicParams;
}

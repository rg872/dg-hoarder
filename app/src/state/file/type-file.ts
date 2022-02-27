export type Provider = "Public Domain Torrents" | "Legit Torrents";

export interface TorrentFile {
  id: string;
  title: string;
  provider: Provider;
  link: string;
  desc?: string;
  size?: string;
  seeds?: number;
  peers?: number;
  uploadedAt?: string;
  age?: string;
}

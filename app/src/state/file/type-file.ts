import type { IpcRendererEvent } from "electron";

export type FileType = "video" | "audio";
export type FileSource = "torrent" | "download";
export type VideoCategory = "movie" | "youtube" | "concert";
export type AudioCategory = "music" | "audiobook";
export type MovieProvider = "Public Domain Torrents" | "Legit Torrents";
export type MusicProvider = "Legit Torrents";
export type DownloadStatus =
  | "ready"
  | "initialized"
  | "onprogress"
  | "paused"
  | "error"
  | "done";

export interface HoardedFile {
  id: string;
  title: string;
  type: FileType;
  source: FileSource;
  category: VideoCategory | AudioCategory;
  provider: MovieProvider | MusicProvider;
  link: string;
  downloadStatus: DownloadStatus;
  progress: number; // 0 - 100
  desc?: string;
  uploadedAt?: string;
  size?: string;
  folderPath: string;
}

export interface HoardedTorrentFile extends HoardedFile {
  downloadStatus: DownloadStatus & "seeding";
  infoHash: string;
  peers?: number;
  magnetUri?: string;
  createdAt?: string;
  createdBy?: string;
  comment?: string;
  remainingTime?: number; // miliseconds
  downloadSpeed?: string;
  uploadSpeed?: string;
}

export type Channel =
  | "download/addNewTorrentDownload"
  | "download/resumeTorrentDownload"
  | "download/pauseTorrentDownload"
  | "download/deleteTorrentDownload";

export interface DownloadPayload {
  id?: string;
  title?: string;
  type?: FileType;
  category?: VideoCategory | AudioCategory;
  provider?: MovieProvider | MusicProvider;
  infoHash?: string;
  link?: string;
  folderPath?: string;
}

export interface TorrentIpcListenerPayload {
  name?: string;
  size?: string;
  progress?: number; // 0 - 100
  downloadStatus: DownloadStatus & "seeding";
  peers?: number;
  infoHash?: string;
  magnetUri?: string;
  createdAt: string;
  createdBy?: string;
  comment?: string;
  remainingTime?: number; // miliseconds
  downloadSpeed?: string;
  uploadSpeed?: string;
}

export type TorrentIpcListenerCallback = (
  event: IpcRendererEvent,
  id: string,
  payload: TorrentIpcListenerPayload
) => void;

export interface UpdateHoardedFileChanges {
  title?: string;
  link?: string;
  downloadStatus?: DownloadStatus;
  progress?: number; // 0 - 100
  desc?: string;
  uploadedAt?: string;
  size?: string;
  folderPath?: string;
}

export interface UpdateHoardedFile {
  id: string;
  changes: UpdateHoardedFileChanges;
}

export interface UpdateHoardedTorrentFileChanges
  extends UpdateHoardedFileChanges {
  downloadStatus?: DownloadStatus & "seeding";
  peers?: number;
  infoHash?: string;
  magnetUri?: string;
  createdAt: string;
  createdBy?: string;
  comment?: string;
  remainingTime?: number; // miliseconds
  downloadSpeed?: string;
  uploadSpeed?: string;
}

export interface UpdateHoardedTorrentFile extends UpdateHoardedFile {
  changes: UpdateHoardedTorrentFileChanges;
}

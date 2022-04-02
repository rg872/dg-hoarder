import type {
  Channel as DicoverChannel,
  fetchPayload as DiscoverPayload,
} from "../../state/discover/type-discover";
import type { Channel as AppConfigChannel } from "../../state/config/type-config";
import type {
  Channel as DownloadChannel,
  DownloadPayload,
  TorrentIpcListenerCallback as DownloadTorrentCallback,
} from "../../state/file/type-file";

export default interface Api {
  fileInfo: (
    channel: DicoverChannel,
    payload: DiscoverPayload
  ) => Promise<unknown>;
  appConfig: <T>(channel: AppConfigChannel) => Promise<T>;
  download: <T>(
    channel: DownloadChannel,
    payload: DownloadPayload
  ) => Promise<T>;
  listener: {
    onTorrentReady: (callback: DownloadTorrentCallback) => void;
    onTorrentDownload: (callback: DownloadTorrentCallback) => void;
    onTorrentUpload: (callback: DownloadTorrentCallback) => void;
    onTorrentNewPeer: (callback: DownloadTorrentCallback) => void;
    onTorrentNoPeers: (callback: DownloadTorrentCallback) => void;
    onTorrentError: (callback: DownloadTorrentCallback) => void;
    onTorrentDone: (callback: DownloadTorrentCallback) => void;
  };
}

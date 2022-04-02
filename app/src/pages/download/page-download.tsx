import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { selectDownloadFiles } from "../../state/file/selector-file";
import { updateTorrentDownload } from "../../state/file/slice-file";
import { HoardedTorrentFile } from "../../state/file/type-file";

import DownloadTorrentSection from "../../components/download-torrent-section/component-download-torrent-section";

const PageDownload = () => {
  const dispatch = useAppDispatch();
  const downloadFiles = useAppSelector(selectDownloadFiles);

  useEffect(() => {
    window.api.listener.onTorrentReady((_, id, payload) => {
      dispatch(updateTorrentDownload({ id, changes: payload }));
    });

    window.api.listener.onTorrentDownload((_, id, payload) => {
      dispatch(updateTorrentDownload({ id, changes: payload }));
    });

    window.api.listener.onTorrentUpload((_, id, payload) => {
      dispatch(updateTorrentDownload({ id, changes: payload }));
    });

    window.api.listener.onTorrentNewPeer((_, id, payload) => {
      dispatch(updateTorrentDownload({ id, changes: payload }));
    });

    window.api.listener.onTorrentNoPeers((_, id, payload) => {
      dispatch(updateTorrentDownload({ id, changes: payload }));
    });

    window.api.listener.onTorrentError((_, id, payload) => {
      dispatch(updateTorrentDownload({ id, changes: payload }));
    });

    window.api.listener.onTorrentDone((_, id, payload) => {
      dispatch(updateTorrentDownload({ id, changes: payload }));
    });
  }, []);

  return (
    <main className="container-fluid">
      {downloadFiles &&
        downloadFiles.map((dlFile) => {
          if (dlFile.source === "torrent") {
            return (
              <DownloadTorrentSection
                key={dlFile.id}
                {...(dlFile as HoardedTorrentFile)}
              />
            );
          }
        })}
    </main>
  );
};

export default PageDownload;

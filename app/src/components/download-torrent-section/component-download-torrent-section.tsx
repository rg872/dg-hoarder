import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";

import {
  AiOutlinePlayCircle,
  AiOutlineDelete,
  AiOutlineCloseCircle,
  AiOutlinePauseCircle,
  AiOutlineReload,
} from "react-icons/ai";
import { useAppDispatch } from "../../hooks/redux";
import {
  deleteTorrentDownload,
  pauseTorrentDownload,
  resumeTorrentDownload,
} from "../../state/file/slice-file";

import { HoardedTorrentFile } from "../../state/file/type-file";
import { formatBytes } from "../../utils/bytes";

import Styles from "./component-download-torrent-section.css";

const DownloadTorrentSection = (props: HoardedTorrentFile) => {
  const dispatch = useAppDispatch();

  const [duration, setDuration] = useState("");
  const [uploadDuration, setUploadDuration] = useState("");
  const [startSeedTime, setStartSeedTime] = useState<null | Date>(null);

  useEffect(() => {
    if (
      typeof props.remainingTime !== "undefined" &&
      props.remainingTime !== Infinity
    ) {
      const durStr = formatDistanceToNow(props.remainingTime, {
        includeSeconds: true,
        addSuffix: true,
      });
      setDuration(durStr);
    } else {
      setDuration("");
    }
  }, [props.remainingTime]);

  useEffect(() => {
    if (props.downloadStatus === "seeding") {
      if (startSeedTime === null) setStartSeedTime(new Date());
    } else {
      if (startSeedTime !== null) setStartSeedTime(null);
    }
  }, [props.downloadStatus]);

  useEffect(() => {
    if (startSeedTime !== null) {
      const updurStr = formatDistanceToNow(startSeedTime, {
        includeSeconds: true,
        addSuffix: true,
      });

      setUploadDuration(updurStr);
    }
  }, [startSeedTime]);

  const onClickResumeTorrent = () => {
    dispatch(
      resumeTorrentDownload({
        id: props.id,
        url: props.link,
        folderPath: props.folderPath,
      })
    );
  };

  const onClickPauseTorrent = () => {
    dispatch(pauseTorrentDownload({ infoHash: props.infoHash, id: props.id }));
  };

  const onClickDeleteTorrent = () => {
    dispatch(
      deleteTorrentDownload({
        id: props.id,
        infoHash: props.infoHash,
        folderPath: props.folderPath,
      })
    );
  };

  return (
    <article>
      <div className={Styles.topWrapper}>
        <h3>{props.title}</h3>
        {props.downloadStatus === "seeding" ? (
          <AiOutlineCloseCircle size={"2rem"} className={Styles.iconButton} />
        ) : (
          <AiOutlineDelete
            size={"2rem"}
            className={Styles.iconButton}
            onClick={() => onClickDeleteTorrent()}
          />
        )}
        {props.downloadStatus !== "error" &&
        props.downloadStatus === "paused" ? (
          <AiOutlinePlayCircle
            size={"2rem"}
            className={Styles.iconButton}
            onClick={() => onClickResumeTorrent()}
          />
        ) : (
          <AiOutlinePauseCircle
            size={"2rem"}
            className={Styles.iconButton}
            onClick={() => onClickPauseTorrent()}
          />
        )}
        {props.downloadStatus === "error" && (
          <AiOutlineReload size={"2em"} className={Styles.iconButton} />
        )}
      </div>
      <div className={Styles.progressWrapper}>
        <progress value={props.progress} max="100"></progress>
        {props.progress || 0}%
      </div>
      <details className={Styles.statusAccordion}>
        {props.downloadStatus === "seeding" ? (
          <summary>
            {props.uploadSpeed} {uploadDuration}
          </summary>
        ) : (
          <summary>
            {props.downloadSpeed} {duration}
          </summary>
        )}
        <p>status: {props.downloadStatus}</p>
        <p>peers: {props.peers}</p>
      </details>
    </article>
  );
};

export default DownloadTorrentSection;

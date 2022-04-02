import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useLazyGetMovieDetailQuery } from "../../state/discover/api-discover";
import type {
  TorrentFile,
  TorrentLink,
} from "../../state/discover/type-discover";
import { addNewTorrentDownload } from "../../state/file/slice-file";

const PageDiscoverDetail = () => {
  const dispatch = useAppDispatch();

  const selectedId = useAppSelector(
    (state) => state.discover.selectedDiscoverId
  );
  const selectedProvider = useAppSelector(
    (state) => state.discover.selectedProvider
  );
  const [getMovieDetail, { data }] = useLazyGetMovieDetailQuery();

  useEffect(() => {
    getMovieDetail({ provider: selectedProvider, id: selectedId });
  }, []);

  const downloadFile = (data: TorrentFile, downloadUrl: string) => {
    dispatch(addNewTorrentDownload({ ...data, link: downloadUrl }));
  };

  return (
    <main className="container-fluid">
      {data && (
        <section>
          <h2>{data.title}</h2>
          <h4>{data.provider}</h4>
          <p>{data.desc}</p>
          <div>
            {Array.isArray(data.link) ? (
              (data.link as TorrentLink[]).map((link) => (
                <button
                  onClick={() => downloadFile(data, link.url)}
                  key={link.url}
                >
                  {link.label}
                </button>
              ))
            ) : (
              <button onClick={() => downloadFile(data, data.link as string)}>
                Download
              </button>
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default PageDiscoverDetail;

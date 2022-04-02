import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  useLazyGetMovieListQuery,
  useGetMovieListQuery,
} from "../../state/discover/api-discover";
import {
  selecteDiscoverId,
  selectProvider,
} from "../../state/discover/slice-discover";
import {
  MovieProvider,
  MusicProvider,
} from "../../state/discover/type-discover";

import Styles from "./page-discover-list.css";

const PageDiscoverList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const selectedCategory = useAppSelector(
    (state) => state.discover.selectedCategory
  );

  const [getMovieList, { data }] = useLazyGetMovieListQuery();

  useEffect(() => {
    if (selectedCategory === "movie") {
      getMovieList({
        // providers: ["Legit Torrents", "Public Domain Torrents"],
        providers: ["Public Domain Torrents"],
        params: { search: "" },
      });
    }
  }, []);

  const toDiscoverDetail = (
    provider: MovieProvider | MusicProvider,
    id: string
  ) => {
    dispatch(selectProvider(provider));
    dispatch(selecteDiscoverId(id));
    navigate("/discover/detail");
  };

  return (
    <main className={`container-fluid ${Styles.pageLayout}`}>
      <section className={Styles.searchSection}>
        <input type="text" name="search" id="search" />
      </section>
      {/* <aside>FILTER</aside> */}
      <section className={Styles.listSection}>
        <div className={Styles.scrollWrapper}>
          {data &&
            data.map((d) => (
              <article className={Styles.listItem} key={d.id}>
                {d.title}
                <span
                  role="button"
                  onClick={() => toDiscoverDetail(d.provider, d.id)}
                >
                  Detail
                </span>
              </article>
            ))}
        </div>
      </section>
    </main>
  );
};

export default PageDiscoverList;

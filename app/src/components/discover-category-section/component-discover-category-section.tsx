import React from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks/redux";
import { selectCategory } from "../../state/discover/slice-discover";
import {
  AudioCategory,
  VideoCategory,
} from "../../state/discover/type-discover";

import Styles from "./component-discover-category-section.css";

interface ComponentProps {
  type: "video" | "audio";
}

interface VideoCategoryItem {
  name: VideoCategory;
  title: string;
  isDisabled: boolean;
}

interface AudioCategoryItem {
  name: AudioCategory;
  title: string;
  isDisabled: boolean;
}

interface CategoryItems {
  video: VideoCategoryItem[];
  audio: AudioCategoryItem[];
}

const categories: CategoryItems = {
  video: [
    { name: "movie", title: "Movie", isDisabled: false },
    { name: "youtube", title: "Youtube Video", isDisabled: true },
    { name: "concert", title: "Concert Video", isDisabled: true },
  ],
  audio: [
    { name: "music", title: "Music", isDisabled: true },
    { name: "audiobook", title: "Audiobook", isDisabled: true },
  ],
};

const DiscoverCategorySection = ({ type }: ComponentProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const toDiscoverList = (name: AudioCategory | VideoCategory) => {
    dispatch(selectCategory(name));
    navigate("/discover/list");
  };

  return (
    <section>
      <h1 className={Styles.title}>{type}</h1>

      <div className={Styles.categoryContainer}>
        {categories[type].map(({ title, name, isDisabled }) => (
          <article className={Styles.categoryCard} key={name}>
            <p>{title}</p>
            <button disabled={isDisabled} onClick={() => toDiscoverList(name)}>
              Search
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default DiscoverCategorySection;

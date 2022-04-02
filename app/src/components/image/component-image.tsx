import React, { ImgHTMLAttributes } from "react";
import useImage from "../../hooks/image";

import Styles from "./component-image.css";

const Image = ({
  imageName,
  ...imgAttributes
}: { imageName: string } & ImgHTMLAttributes<any>) => {
  const { image, loading, error, brokenImage } = useImage(imageName);

  if (error) return <img src={brokenImage} />;

  return <>{loading ? <button aria-busy="true" /> : <img src={image} />}</>;
};

export default Image;

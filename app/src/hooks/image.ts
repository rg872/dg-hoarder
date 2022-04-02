import { useEffect, useState } from "react";
import brokenImage from "../assets/image/broken-image.png";

/* 
  taken from https://stackoverflow.com/a/70024111
  why use custom hook instead on useEffect on image component?
  by doing this we can get consistent image path

  if the hook is inside image component,
  the image path will be relative to the imported image component path
*/

const useImage = (fileName: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const response = await import(`../assets/image/${fileName}`);
        setImage(response.default);
      } catch (err) {
        if (typeof err === "string") {
          setError(err);
        } else {
          setError(`Error occured when importing image ${fileName}`);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [fileName]);

  return {
    loading,
    error,
    image,
    brokenImage,
  };
};

export default useImage;

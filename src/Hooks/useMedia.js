import React, { useEffect, useState } from "react";

const useMedia = (media) => {
  const [ match, setMatch ] = useState(null);

  useEffect(() => {
    const changeMatch = () => {
      const { matches } = window.matchMedia(media);
      setMatch((prevMatch) => (prevMatch = matches));
    };
    changeMatch();
    window.addEventListener("resize", changeMatch);
    return () => {
      window.removeEventListener("resize", changeMatch);
    };
  }, [media]);

  return match;
};

export default useMedia;

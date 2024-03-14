import { useState, useEffect } from "react";

import buzz from "../sounds/buzz00.mp3";

const PlayBuzz = ({ event }) => {
  const [isPreLoading, setIsPreLoading] = useState(true);
  const [audio] = useState(new Audio(buzz));

  useEffect(() => {
    audio.preload = "auto";
  }, [audio]);

  useEffect(() => {
    const buzzPlayer = () => {
      audio.play();
    };
    if (!isPreLoading) {
      buzzPlayer();
    }
    setIsPreLoading(false);

    // eslint-disable-next-line
  }, [event, audio]);
};

export default PlayBuzz;

import { useState, useEffect } from "react";

import buzz from "../sounds/buzz.mp3";
// import laser from "../../Data/sounds/laser.mp3";
// import laser2 from "../../Data/sounds/laser2.mp3";
// import laser3 from "../../Data/sounds/laser3.mp3";
// import laser4 from "../../Data/sounds/laser4.mp3";

const PlayBuzz = ({ event }) => {
  const [audio] = useState(new Audio(buzz));

  useEffect(() => {
    audio.preload = "auto";
  }, [audio]);

  useEffect(() => {
    const buzzPlayer = () => {
      audio.play();
    };
    buzzPlayer();

    // eslint-disable-next-line
  }, [event, audio]);
};

export default PlayBuzz;

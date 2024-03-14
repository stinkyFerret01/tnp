import { useState, useEffect } from "react";

import laser from "../sounds/laser00.mp3";

const PlayLaser = ({ event }) => {
  const [isPreLoading, setIsPreLoading] = useState(true);
  const [audio] = useState(new Audio(laser));

  // const laserPlayer = () => { //---- multi-laser (WIP) ----
  //   const randomNumber = Math.floor(Math.random() * 4);
  //   audios[randomNumber].play();
  // };

  useEffect(() => {
    audio.preload = "auto";
  }, [audio]);

  useEffect(() => {
    const laserPlayer = () => {
      audio.play();
    };
    if (!isPreLoading) {
    }
    laserPlayer();
    setIsPreLoading(false);

    // eslint-disable-next-line
  }, [event, audio]);
};

export default PlayLaser;

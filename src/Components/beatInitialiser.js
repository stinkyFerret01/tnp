import { useState, useEffect } from "react";

import dateFormatter from "../utils/dateFormatter";

const BeatInitialiser = ({ isPlaying, beat, setBeat }) => {
  //==> stores the date from when the beats will be synchronised
  const [initBeatDate, setInitBeatDate] = useState(0);

  //---- BEAT REPEATER ----
  useEffect(() => {
    //--> calculates delay before next beat
    let mult = beat + 1;
    let target = initBeatDate + 121 * mult;
    let beatDate = Date.now();
    let delay = target - beatDate;
    if (delay < 0 && delay > -10000) {
      console.log("PROBLEM", dateFormatter());
      console.log("next beat delay -(", delay, "ms )- should not be negative");
    }

    //--> sets next beat
    if (initBeatDate > 0 && beat < 1879) {
      setTimeout(() => {
        setBeat((prevBeat) => prevBeat + 1);
      }, delay);
    } else if (initBeatDate === 0 || beat === 1879) {
      setBeat(0);
    }

    // eslint-disable-next-line
  }, [initBeatDate, beat]);

  // ---- BEAT INITIALISER ----
  useEffect(() => {
    if (isPlaying) {
      //--> stores beat initialization date (triggs BEAT INITIALISER useEffect loop)
      setInitBeatDate(Date.now());
    } else {
      //--> resets beats values (stops BEAT INITIALISER useEffect loop)
      setInitBeatDate(0);
    }
  }, [isPlaying, setBeat, setInitBeatDate]);
};

export default BeatInitialiser;

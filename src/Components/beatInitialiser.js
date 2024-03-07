import { useState, useEffect } from "react";

//---- (control purpose -- LOG ONLY) ----
//--> checks if the delay is negative
import delayControler from "../utils/logs/delayControlerLog";

import hsbfGameData from "../beatData/hbfsGameData";

const BeatInitialiser = ({ isPlaying, beat, setBeat }) => {
  //==> stores the date from when the beats will be synchronised
  const [initBeatDate, setInitBeatDate] = useState(0);

  //---- BEAT REPEATER ----
  useEffect(() => {
    //--> calculates delay before next beat
    let mult = beat + 1;
    let target = initBeatDate + hsbfGameData.tempo * mult;
    let beatDate = Date.now();
    let delay = target - beatDate;

    //---- (control purpose -- LOG ONLY) ----
    delayControler(delay);

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

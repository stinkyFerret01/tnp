import { useState, useEffect } from "react";

import dateFormatter from "../../utils/dateFormatter";

//---- (control purpose -- LOG ONLY) ----
//--> checks if the delay is negative
// import delayControlerLog from "../../utils/logs/delayControlerLog";

import hsbfGameData from "../../beatData/hbfsGameData";

const BeatInitialiser = ({
  audioCommand,
  isPlaying,
  beat,
  setBeat,
  negDelays,
  setNegDelays,
}) => {
  //==> stores the date from when the beats will be synchronised
  const [initBeatDate, setInitBeatDate] = useState(0);

  const delayControler = (delay) => {
    if (delay < 0 && delay > -10000) {
      // that means beat is super late and has to increase more than 1 to re-synch
      const newNegDelays = [
        ...negDelays,
        { when: dateFormatter(), howMuchMs: delay },
      ];
      setNegDelays(newNegDelays);
      // delayControlerLog(delay);
    }
  };

  //---- BEAT REPEATER ----
  useEffect(() => {
    //--> sets next beat
    if (initBeatDate > 0 && beat < 1879) {
      //--> calculates delay before next beat
      let mult = beat + 1;
      let target = initBeatDate + hsbfGameData.tempo * mult;
      let beatDate = Date.now();
      let delay = target - beatDate;

      //---- (control purpose -- LOG ONLY) ----
      delayControler(delay);

      //--> nextBeat
      setTimeout(() => {
        setBeat((prevBeat) => prevBeat + 1);
      }, delay);

      //--> stops the beat loop (reseting initBeatDate)
    } else if (initBeatDate > 0 && beat === 1879) {
      setInitBeatDate(0);

      //--> resets the beat
    } else if (initBeatDate === 0 && beat > 0) {
      setBeat(0);
    }

    // eslint-disable-next-line
  }, [initBeatDate, beat]);

  // ---- BEAT INITIALISER ----
  useEffect(() => {
    if (isPlaying && audioCommand.actionX === "play") {
      //--> stores beat initialization date (triggs BEAT INITIALISER useEffect loop)
      setInitBeatDate(Date.now());
    } else if (isPlaying && audioCommand.actionX === "skip") {
      setInitBeatDate(Date.now() - hsbfGameData.skipTimePosition * 1000);
      setBeat(380);
    } else {
      //--> resets beats values (stops BEAT INITIALISER useEffect loop)
      setInitBeatDate(0);
    }
  }, [audioCommand, isPlaying, setBeat, setInitBeatDate]);
};

export default BeatInitialiser;

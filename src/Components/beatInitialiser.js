import { useState, useEffect } from "react";

const BeatInitialiser = ({
  currentTime,
  setCurrentTime,
  isPlaying,
  setIsPlaying,
  beat,
  setBeat,
}) => {
  const [initBeatDate, setInitBeatDate] = useState(0);
  // const [currentTimeMarker, setCurrentTimeMarker] = useState(0);

  const [controlBeat1, setControlBeat1] = useState(null);
  const [controlBeat2, setControlBeat2] = useState(null);
  const [beatDif, setBeatDif] = useState(null);

  // ---- BEATS INITIALIZER ----
  useEffect(() => {
    let mult = beat + 1;
    let target = initBeatDate + 121 * mult;
    console.log("INIT", initBeatDate);
    console.log("DATE", Date.now());
    console.log("TARGET", target);
    console.log("BEAT", beat);
    let beatDate = Date.now();
    let delay = target - beatDate;
    console.log("delay", delay);

    if (initBeatDate > 0) {
      setTimeout(() => {
        setBeat((prevBeat) => prevBeat + 1);
      }, delay);
    }

    // date checker
    if (beat === 120) {
      // console.log(beatDates);
      setControlBeat1(beatDate);
    } else if (beat === 1120) {
      // console.log(beatDate - 12100);
      setControlBeat2(beatDate);
      setBeatDif(beatDate - controlBeat1);
    }

    // eslint-disable-next-line
  }, [isPlaying, initBeatDate, beat]);

  useEffect(() => {
    if (isPlaying) {
      setInitBeatDate(Date.now());
    } else {
      setInitBeatDate(0);
      setTimeout(() => {
        setBeat(0);
      }, 2000);
    }
  }, [isPlaying, setBeat, setInitBeatDate]);

  // useEffect(() => {
  //   clearInterval(intervalId);

  //   if (isPlaying) {
  //     // console.log("isPlayingUseEffect:", Date.now()); //-- TEST PURPOSE -- synchro helper ----
  //     let id = null;
  //     let tempo = 121;
  //     setTimeout(() => {
  //       // console.log("initBeatInterval", Date.now()); //-- TEST PURPOSE -- synchro helper ----
  //       setInitBeatDate(Date.now());
  //       setCurrentTimeMarker(currentTime);

  //       let beatIntervalId = setInterval(() => {
  //         setBeat((prevBeat) => prevBeat + 1);
  //       }, tempo);
  //       id = beatIntervalId;
  //       setIntervalId(id);

  //       setTimeout(() => {
  //         setBeat(21);
  //       }, 2000);

  //       return () => {
  //         clearInterval(beatIntervalId);
  //       };
  //     }, 100);
  //   } else {
  //     setBeat(0);
  //   }

  //   // eslint-disable-next-line
  // }, [isPlaying]);

  return (
    <div>
      <div style={{ backgroundColor: "yellow" }}>
        <p>initBeatDate -----: {initBeatDate}</p>
      </div>
      {/* <div style={{ backgroundColor: "orange" }}>
        <p>currentTimeMarker -----: {currentTimeMarker}</p>
      </div> */}
      <div style={{ backgroundColor: "pink" }}>
        <p>controlBeat1 -----: {controlBeat1}</p>
      </div>
      <div style={{ backgroundColor: "pink" }}>
        <p>controlBeat2 -----: {controlBeat2}</p>
      </div>
      <div style={{ backgroundColor: "pink" }}>
        <p>beatDif -----: {beatDif}</p>
      </div>
    </div>
  );
};

export default BeatInitialiser;

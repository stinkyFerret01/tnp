import { useState, useEffect } from "react";

const BeatInitialiser = ({
  currentTime,
  setCurrentTime,
  isPlaying,
  setIsPlaying,
  beat,
  setBeat,
}) => {
  const [intervalId, setIntervalId] = useState(null);

  const [initBeatDate, setInitBeatDate] = useState(0);
  const [currentTimeMarker, setCurrentTimeMarker] = useState(0);

  const [controlBeat1, setControlBeat1] = useState(null);
  const [controlBeat2, setControlBeat2] = useState(null);
  const [beatDif, setBeatDif] = useState(null);

  // ---- BEATS INITIALIZER ----
  useEffect(() => {
    let beatDate = Date.now();
    if (beat === 120) {
      console.log(beatDate);
      setControlBeat1(beatDate);
    } else if (beat === 220) {
      console.log(beatDate - 12100);
      setControlBeat2(beatDate);
      setBeatDif(beatDate - controlBeat1);
    }

    // eslint-disable-next-line
  }, [beat]);

  useEffect(() => {
    clearInterval(intervalId);

    if (isPlaying) {
      // console.log("isPlayingUseEffect:", Date.now()); //-- TEST PURPOSE -- synchro helper ----
      let id = null;
      let tempo = 121;
      setTimeout(() => {
        // console.log("initBeatInterval", Date.now()); //-- TEST PURPOSE -- synchro helper ----
        setInitBeatDate(Date.now());
        setCurrentTimeMarker(currentTime);

        let beatIntervalId = setInterval(() => {
          setBeat((prevBeat) => prevBeat + 1);
        }, tempo);
        id = beatIntervalId;
        setIntervalId(id);

        setTimeout(() => {
          setBeat(21);
        }, 2000);

        return () => {
          clearInterval(beatIntervalId);
        };
      }, 100);
    } else {
      setBeat(0);
    }

    // eslint-disable-next-line
  }, [isPlaying]);

  return (
    <div>
      <div style={{ backgroundColor: "yellow" }}>
        <p>initBeatDate -----: {initBeatDate}</p>
      </div>
      <div style={{ backgroundColor: "orange" }}>
        <p>currentTimeMarker -----: {currentTimeMarker}</p>
      </div>
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

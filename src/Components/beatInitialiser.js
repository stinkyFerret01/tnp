import { useState, useEffect } from "react";

const BeatInitialiser = ({
  currentTime,
  setCurrentTime,
  isPlaying,
  setIsPlaying,
  setBeat,
}) => {
  const [intervalId, setIntervalId] = useState(null);

  const [initBeatDate, setInitBeatDate] = useState(0);
  const [currentTimeMarker, setCurrentTimeMarker] = useState(0);

  // ---- BEATS INITIALIZER ----
  useEffect(() => {
    if (currentTime > 5.56 && currentTime < 5.6) {
      setIsPlaying(true);
    }
  }, [currentTime, setIsPlaying]);

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
    </div>
  );
};

export default BeatInitialiser;

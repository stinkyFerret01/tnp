import { useState, useEffect } from "react";

const BeatInitialiser = ({
  isPlaying,
  beat,
  setBeat,
  currentTime,
  setCurrentTime,
}) => {
  const [intervalId, setIntervalId] = useState(null);

  const [initBeatDate, setInitBeatDate] = useState(0);
  const [currentTimeMarker, setCurrentTimeMarker] = useState(0);

  // ---- BEATS INITIALIZER ----
  useEffect(() => {
    clearInterval(intervalId);

    if (isPlaying) {
      // console.log("isPlayingUseEffect:", Date.now()); //-- TEST PURPOSE -- synchro helper ----
      let id = null;
      let tempo = 121;
      setTimeout(() => {
        // console.log("initBeatInterval", Date.now()); //-- TEST PURPOSE -- synchro helper ----
        let beatIntervalId = setInterval(() => {
          setBeat((prevBeat) => prevBeat + 1);
        }, tempo);

        id = beatIntervalId;
        setIntervalId(id);
        setInitBeatDate(Date.now());
        setCurrentTimeMarker(currentTime);

        //sync cheats
        if (currentTime > 3) {
          setTimeout(() => {
            setBeat((prevBeat) => prevBeat - 10);
          }, 2000);
        }

        return () => {
          clearInterval(beatIntervalId);
        };
      }, 290);
    } else {
      setBeat(0);
    }

    // eslint-disable-next-line
  }, [isPlaying]);

  // -- TEST PURPOSE -- synchro helper ----
  // useEffect(() => {
  //   console.log("BEAT", beat, Date.now());
  // }, [beat]);

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

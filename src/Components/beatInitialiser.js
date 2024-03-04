import { useState, useEffect } from "react";

const BeatInitialiser = ({ isPlaying, beat, setBeat }) => {
  const [intervalId, setIntervalId] = useState(null);

  const [initBeatDate, setInitBeatDate] = useState(0);

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
    <div style={{ backgroundColor: "white" }}>
      {initBeatDate && <p>initBeatDate -----: {initBeatDate}</p>}
    </div>
  );
};

export default BeatInitialiser;

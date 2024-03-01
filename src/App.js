import { useState, useRef, useEffect } from "react";

import beatRule from "./beatData/harderBetterFasterStronger";
import "./App.css";

import ButtonList from "./Components/buttonList";

function App() {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [beat, setBeat] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [intervalIds, setIntervalIds] = useState([]);
  const [goodWords, setGoodWords] = useState(null);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const timeDefiner = (timex, beatx) => {
    if (audioRef.current) {
      audioRef.current.currentTime = timex;
      setBeat(beatx);
    }
  };

  const handlePlayButtonClick = () => {
    let timex = 2;
    if (currentTime === 0) timex = 0;
    setPlaying(true);
    if (audioRef.current) {
      audioRef.current.play();
      audioRef.current.currentTime = timex;
      setBeat(5);
    }
  };

  const handleStopButtonClick = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setBeat(0);
    }
    intervalIds.forEach((id) => clearInterval(id));
    setPlaying(false);
  };

  const handleSkipButtonClick = () => {
    timeDefiner(49.5, 409);
    // if (audioRef.current) {
    //   audioRef.current.currentTime = 49.4;
    //   setBeat(5);
    // }
  };

  //---- BEATINITIALIZER ---
  useEffect(() => {
    // if (!playing) {
    //   if (currentTime > 0) setPlaying(true);
    // }
    // eslint-disable-next-line
  }, [currentTime]);

  //---- BEATS ----
  useEffect(() => {
    if (playing) {
      let ids = [];
      let tempo = 121;

      let beatIntervalId = setInterval(() => {
        setBeat((prevBeat) => prevBeat + 1);
      }, tempo);
      ids.push(beatIntervalId);

      setIntervalIds(ids);
    }
    return () => {
      intervalIds.forEach((id) => clearInterval(id));
    };
    // eslint-disable-next-line
  }, [playing]);

  //---- GOODWORDS SETTER ----
  useEffect(() => {
    if (beat <= 1850) {
      setGoodWords(beatRule[beat].goodWords);
    } else {
      setBeat(0);
    }
    if (beat === 2) {
      timeDefiner(1, 17);
    }
  }, [beat]);

  return (
    <div className="App">
      <ButtonList beat={beat} goodWords={goodWords}></ButtonList>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        width="10000"
        className="audioPlayer"
        src="../Audio/HBFSp02.mp3"
        type="audio/mp3"
        controls
        // muted="false"
        loop
        // autoPlay
      />
      <div>
        <article>
          <p>Current Time: {currentTime}</p>
          <p>Beat ----: {beat}</p>
          <button
            style={
              currentTime > 5
                ? { visibility: "display" }
                : { visibility: "hidden" }
            }
            onClick={() => {
              timeDefiner(98.8, 806);
            }}
          >
            {currentTime > 0 ? "Restart" : "Play"}
            skip 2
          </button>
          <button
            onClick={() => {
              console.log("Beat :", beat);
            }}
          >
            test
          </button>
        </article>
      </div>
      <div>
        <article>
          <button
            // style={
            //   currentTime > 5
            //     ? { visibility: "display" }
            //     : { visibility: "hidden" }
            // }
            onClick={handleSkipButtonClick}
          >
            skip
          </button>
          <button onClick={handleStopButtonClick}>Stop</button>
          <button onClick={handlePlayButtonClick}>
            {currentTime > 0 ? "Restart" : "Play"}
          </button>
        </article>
      </div>
    </div>
  );
}

export default App;

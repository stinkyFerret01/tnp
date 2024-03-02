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
    setPlaying(true);
  };

  const handleStopButtonClick = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      timeDefiner(0, 0);
    }
    intervalIds.forEach((id) => clearInterval(id));
    setPlaying(false);
  };

  const handleSkipButtonClick = () => {
    timeDefiner(49.5, 409);
  };

  //---- MUSIC and BEATS INITIALIZERS ----
  useEffect(() => {
    if (playing) {
      let trackStarter = 1;
      let firstBeat = 8;
      setTimeout(() => {
        audioRef.current.play();
        timeDefiner(trackStarter, firstBeat);
      }, 200);

      let ids = [];
      let tempo = 121;

      let beatIntervalId = setInterval(() => {
        setBeat((prevBeat) => prevBeat + 1);
      }, tempo);
      ids.push(beatIntervalId);

      setIntervalIds(ids);
      return () => {
        intervalIds.forEach((id) => clearInterval(id));
      };
    }

    // eslint-disable-next-line
  }, [playing]);

  //---- GOODWORDS SETTER ----
  useEffect(() => {
    if (beat <= 1850) {
      setGoodWords(beatRule[beat].goodWords);
    } else {
      setBeat(0);
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
          <button onClick={handleSkipButtonClick}>skip</button>
          <button onClick={handleStopButtonClick}>Stop</button>
          <button onClick={handlePlayButtonClick}>Play</button>
        </article>
      </div>
    </div>
  );
}

export default App;

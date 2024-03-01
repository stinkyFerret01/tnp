import { useState, useRef, useEffect } from "react";

import beatRule from "./beatData/harderBetterFasterStronger";
import "./App.css";

import ButtonList from "./Components/buttonList";

function App() {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [beat, setBeat] = useState(5);
  const [beatDif, setBeatDif] = useState(0);
  const [playing, setPlaying] = useState(false);

  const [goodWords, setGoodWords] = useState(null);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const timeDefiner = (timex, beatx) => {
    if (audioRef.current) {
      audioRef.current.currentTime = timex;
      setCurrentTime(audioRef.current.currentTime);
      setBeat(beatx);
    }
  };

  //---- BEATINITIALIZER ---
  useEffect(() => {
    if (playing === false) {
      if (currentTime) setPlaying(true);
    }
  }, [currentTime]);

  //---- BEATS ----
  useEffect(() => {
    if (playing) {
      for (let i = 0; i < 8; i++) {
        let delay = 121 * i;
        setTimeout(() => {
          setInterval(() => {
            setBeat((prevBeat) => prevBeat + 1);
          }, 971);
        }, delay);
      }
    }
  }, [playing]);

  //---- BEATDIF (beat test purpose) ----
  useEffect(() => {
    if (playing) {
      const intervalId = setInterval(() => {
        setBeatDif((prevBeatDif) => prevBeatDif + 1);
      }, 121);

      return () => clearInterval(intervalId);
    }
  }, [playing]);

  //---- GOODWORDS SETTER ----
  useEffect(() => {
    if (beat <= 1850) {
      setGoodWords(beatRule[beat].goodWords);
    } else {
      setBeat(0);
    }
  }, [beat]);

  //---- TEST ----
  useEffect(() => {
    if (beat === 400 || beat === 800 || beat === 1200 || beat === 1600) {
      console.log("beat ---:", beat);
      console.log("beatDif :", beatDif);
    }
  }, [beatDif]);

  return (
    <div className="App">
      <ButtonList beat={beat} goodWords={goodWords}></ButtonList>
      <div>
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          width="10000"
          // className="audioPlayer"
          src="../Audio/HBFS.mp3"
          type="audio/mp3"
          controls
          // muted="false"
          loop
          // autoPlay
        />
      </div>
      <div>
        <p>Current Time: {currentTime}</p>
        <button
          style={{ width: "4rem", height: "4rem" }}
          onClick={() => {
            console.log("Beat :", beat);
            console.log("BeatDif :", beatDif);
          }}
        >
          test
        </button>
        <button
          style={{ width: "4rem", height: "4rem" }}
          onClick={() => {
            timeDefiner(49.4, 403);
          }}
        >
          skip
        </button>
        <button
          style={{ width: "4rem", height: "4rem" }}
          onClick={() => {
            timeDefiner(98.8, 806);
          }}
        >
          skip 2
        </button>
        <button
          style={{ width: "4rem", height: "4rem" }}
          onClick={() => {
            timeDefiner(144.2, 1200);
          }}
        >
          skip 3
        </button>
        <p>Beat ----: {beat}</p>
        <p>BeatDif : {beatDif}</p>
      </div>
    </div>
  );
}

export default App;

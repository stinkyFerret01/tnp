import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

//==> pages
import HomePage from "./Components/homePage";
import GamePage from "./Components/gamePage";

//==> load and plays the music, triggs the BeatInitializer
import AudioContext from "./Components/audioContext";

//==> set a beats loop synchronised with the music
import BeatInitialiser from "./Components/beatInitialiser";

//==> controls game mechanics value (control purpose)
import Control from "./Components/control";

function App() {
  //==> stores the infos that triggs music and beats mechanics
  const [audioCommand, setAudioCommand] = useState({
    actionX: null,
    timex: 0,
    beatx: 0,
  });

  //==> triggs or stops the beat intializer from the music
  const [isPlaying, setIsPlaying] = useState(false);

  //==> stores the beat value that triggs buttons and animations activation
  const [beat, setBeat] = useState(0);

  //==> control
  const [timeJumps, setTimeJumps] = useState([]);
  const [outputLatency, setOutputLatency] = useState(null);

  return (
    <div className="App">
      <AudioContext
        audioCommand={audioCommand}
        setIsPlaying={setIsPlaying}
        setOutputLatency={setOutputLatency}
      ></AudioContext>
      <BeatInitialiser
        isPlaying={isPlaying}
        beat={beat}
        setBeat={setBeat}
      ></BeatInitialiser>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                setAudioCommand={setAudioCommand}
                isPlaying={isPlaying}
              />
            }
          />
          <Route
            path="/game"
            element={
              <GamePage
                setAudioCommand={setAudioCommand}
                isPlaying={isPlaying}
                beat={beat}
                setBeat={setBeat}
              />
            }
          />
        </Routes>
      </Router>
      <Control
        isPlaying={isPlaying}
        outputLatency={outputLatency}
        beat={beat}
        timeJumps={timeJumps}
        setTimeJumps={setTimeJumps}
      ></Control>
    </div>
  );
}

export default App;

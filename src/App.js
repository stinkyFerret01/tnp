import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

//==> pages
import HomePage from "./Pages/homePage";
import GamePage from "./Pages/gamePage";

//==> load and plays the music, triggs the BeatInitializer
import AudioContext from "./Components/musicAndBeats/audioContext";

//==> set a beats loop synchronised with the music
import BeatInitialiser from "./Components/musicAndBeats/beatInitialiser";

//==> controls game mechanics value (control purpose)
import Control from "./Components/controlContent/control";

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
  const [negDelays, setNegDelays] = useState([]);
  const [outputLatency, setOutputLatency] = useState(null);

  //==> test
  const [audioContextState, setAudioContextState] = useState(null);

  return (
    <div className="App">
      <AudioContext
        audioCommand={audioCommand}
        setIsPlaying={setIsPlaying}
        setOutputLatency={setOutputLatency}
        setAudioContextState={setAudioContextState}
      ></AudioContext>
      <BeatInitialiser
        isPlaying={isPlaying}
        beat={beat}
        setBeat={setBeat}
        negDelays={negDelays}
        setNegDelays={setNegDelays}
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
        audioContextState={audioContextState}
        beat={beat}
        timeJumps={timeJumps}
        setTimeJumps={setTimeJumps}
        negDelays={negDelays}
        setNegDelays={setNegDelays}
      ></Control>
    </div>
  );
}

export default App;

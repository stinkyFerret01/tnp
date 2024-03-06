import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

//==> pages
import HomePage from "./Components/homePage";
import GamePage from "./Components/gamePage";

//==> starts and stops the game, triggs the AudiContext
// import Command from "./Components/command";

//==> load and plays the music, triggs the BeatInitializer
import AudioContext from "./Components/audioContext";

//==> set a beats loop synchronised with the music
import BeatInitialiser from "./Components/beatInitialiser";

//==> the game, buttons, score status and animations
// import ButtonPanel from "./Components/buttonPanel";
// import ScoreStatus from "./Components/scoreStatus";
// import MissedShotsStatus from "./Components/missedShotsStatus";

//==> controls game mechanics value (test purpose)
import Control from "./Components/control";

function App() {
  //==> stores the infos to trig music and beats mechanics
  const [audioCommand, setAudioCommand] = useState({
    actionX: null,
    timex: 0,
    beatx: 0,
  });

  //==> triggs or stops the beat intializer from the music
  const [isPlaying, setIsPlaying] = useState(false);

  //==> stores the beat value that triggs buttons and animations activation
  const [beat, setBeat] = useState(0);

  //==> stores the scores events and status
  // const [score, setScore] = useState(0);
  // const [missedShots, setMissedShots] = useState([]);

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
            element={<HomePage setAudioCommand={setAudioCommand} />}
          />
          <Route
            path="/game"
            element={
              <GamePage
                setAudioCommand={setAudioCommand}
                beat={beat}
                setBeat={setBeat}
              />
            }
          />
        </Routes>
      </Router>
      {/* <ScoreStatus score={score}></ScoreStatus>
      <MissedShotsStatus missedShots={missedShots}></MissedShotsStatus>
      <ButtonPanel
        beat={beat}
        setBeat={setBeat}
        score={score}
        setScore={setScore}
        missedShots={missedShots}
        setMissedShots={setMissedShots}
      ></ButtonPanel> */}
      {/* <Command setAudioCommand={setAudioCommand}></Command> */}
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

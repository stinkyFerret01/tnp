import { useState } from "react";

import BeatInitialiser from "./Components/beatInitialiser";
import Control from "./Components/control";
import Command from "./Components/command";
import ScoreStatus from "./Components/scoreStatus";
import MissedShotsStatus from "./Components/missedShotsStatus";

import AudioContext from "./Components/audioContext";

import "./App.css";

import ButtonPanel from "./Components/buttonPanel";

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [checkCurrentTimeIntervalId, setCheckCurrentTimeIntervalId] =
    useState(null);

  const [beat, setBeat] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [score, setScore] = useState(0);
  const [missedShots, setMissedShots] = useState([]);

  const [audioCommand, setAudioCommand] = useState({
    actionX: null,
    timex: 0,
    beatx: 0,
  });

  return (
    <div className="App">
      <ScoreStatus score={score}></ScoreStatus>
      <MissedShotsStatus missedShots={missedShots}></MissedShotsStatus>
      <ButtonPanel
        beat={beat}
        setBeat={setBeat}
        score={score}
        setScore={setScore}
        missedShots={missedShots}
        setMissedShots={setMissedShots}
      ></ButtonPanel>
      <AudioContext
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        checkCurrentTimeIntervalId={checkCurrentTimeIntervalId}
        setCheckCurrentTimeIntervalId={setCheckCurrentTimeIntervalId}
        audioCommand={audioCommand}
        setBeat={setBeat}
        setIsPlaying={setIsPlaying}
      ></AudioContext>
      <BeatInitialiser
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        setCheckCurrentTimeIntervalId={setCheckCurrentTimeIntervalId}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        beat={beat}
        setBeat={setBeat}
      ></BeatInitialiser>
      <Command
        setAudioCommand={setAudioCommand}
        setScore={setScore}
        setMissedShots={setMissedShots}
      ></Command>
      <Control beat={beat}></Control>
    </div>
  );
}

export default App;

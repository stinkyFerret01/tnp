import { useState } from "react";

import AudioNBeat from "./Components/audioNBeat";
import Control from "./Components/control";
import Command from "./Components/command";
import ScoreStatus from "./Components/scoreStatus";
import MissedShotsStatus from "./Components/missedShotsStatus";
import "./App.css";

import ButtonPanel from "./Components/buttonPanel";

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [beat, setBeat] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [missedShots, setMissedShots] = useState([]);

  const [audioCommand, setAudioCommand] = useState({
    timex: 0,
    beatx: 0,
    actionx: "pause",
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
      <AudioNBeat
        playing={playing}
        setPlaying={setPlaying}
        beat={beat}
        setBeat={setBeat}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        audioCommand={audioCommand}
        setAudioCommand={setAudioCommand}
      ></AudioNBeat>
      <Command
        beat={beat}
        setPlaying={setPlaying}
        setAudioCommand={setAudioCommand}
        setScore={setScore}
        setMissedShots={setMissedShots}
      ></Command>
      <Control beat={beat} currentTime={currentTime}></Control>
    </div>
  );
}

export default App;

import { useState } from "react";

import AudioNBeat from "./Components/audioNBeat";
import Control from "./Components/control";
// import Command from "./Components/command";
import ScoreStatus from "./Components/scoreStatus";
import MissedShotsStatus from "./Components/missedShotsStatus";

import YourComponent from "./Components/audioContext";

import "./App.css";

import ButtonPanel from "./Components/buttonPanel";

function App() {
  const [currentTime, setCurrentTime] = useState(false);

  const [beat, setBeat] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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
      <YourComponent
        setBeat={setBeat}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      ></YourComponent>
      <AudioNBeat
        playing={playing}
        setPlaying={setPlaying}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        beat={beat}
        setBeat={setBeat}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        audioCommand={audioCommand}
        setAudioCommand={setAudioCommand}
      ></AudioNBeat>
      {/* <Command
        beat={beat}
        setBeat={setBeat}
        setPlaying={setPlaying}
        setAudioCommand={setAudioCommand}
        setScore={setScore}
        setMissedShots={setMissedShots}
      ></Command> */}
      <Control beat={beat} currentTime={currentTime}></Control>
    </div>
  );
}

export default App;

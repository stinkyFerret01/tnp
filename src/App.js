import { useState } from "react";
import "./App.css";

//==> starts and stops the game, triggs the AudiContext
import Command from "./Components/command";

//==> load and plays the music, triggs the BeatInitializer
import AudioContext from "./Components/audioContext";

//==> set a beats loop synchronised with the music
import BeatInitialiser from "./Components/beatInitialiser";

//==> the game, buttons, score status an danimations
import ButtonPanel from "./Components/buttonPanel";
import ScoreStatus from "./Components/scoreStatus";
import MissedShotsStatus from "./Components/missedShotsStatus";

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
  const [score, setScore] = useState(0);
  const [missedShots, setMissedShots] = useState([]);

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
        audioCommand={audioCommand}
        setIsPlaying={setIsPlaying}
      ></AudioContext>
      <BeatInitialiser
        isPlaying={isPlaying}
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

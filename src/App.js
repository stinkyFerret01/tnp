import { useState } from "react";

import AudioNBeat from "./Components/audioNBeat";
import Control from "./Components/control";
import Command from "./Components/command";
import "./App.css";

import ButtonList from "./Components/buttonList";

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [beat, setBeat] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [audioCommand, setAudioCommand] = useState({
    timex: 0,
    beatx: 0,
    actionx: "pause",
  });

  return (
    <div className="App">
      <ButtonList beat={beat} setBeat={setBeat}></ButtonList>
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
      <Control beat={beat} currentTime={currentTime}></Control>
      <Command
        setPlaying={setPlaying}
        setAudioCommand={setAudioCommand}
      ></Command>
    </div>
  );
}

export default App;

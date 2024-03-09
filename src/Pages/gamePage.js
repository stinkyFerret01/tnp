import { useState, useEffect } from "react";

import GamePageTop from "../Components/gameContent/gamePageTop";
import ButtonPanel from "../Components/gameContent/buttonPanel";
import GamePageBottom from "../Components/gameContent/gamePageBottom";

const GamePage = ({ setAudioCommand, isPlaying, beat, setBeat }) => {
  const [isRunning, setIsRunning] = useState(true);

  //==> stores the timeoutIds so they can be cleared if Player stops game
  const [buttonActivationTimeOutIds, setButtonActivationTimeOutIds] = useState(
    []
  );
  //==> stores the objects taht generate laser animation for goodWords
  const [beatWawes, setBeatWawes] = useState([]);

  //==> stores the current game scores value
  const [score, setScore] = useState(0);
  const [missedTargets, setMissedTargets] = useState(0);
  const [missedShots, setMissedShots] = useState([]);

  //--> resets the scores for a new game
  useEffect(() => {
    if (beat === 0) {
      setScore(0);
      setMissedTargets(0);
      setMissedShots([]);
    }
  }, [beat]);

  return (
    <main className="game-page">
      <GamePageTop
        isPlaying={isPlaying}
        isRunning={isRunning}
        beat={beat}
        score={score}
        missedShots={missedShots}
        missedTargets={missedTargets}
      ></GamePageTop>
      <ButtonPanel
        beat={beat}
        setBeat={setBeat}
        score={score}
        setScore={setScore}
        setMissedTargets={setMissedTargets}
        missedShots={missedShots}
        setMissedShots={setMissedShots}
        setButtonActivationTimeOutIds={setButtonActivationTimeOutIds}
        beatWawes={beatWawes}
        setBeatWawes={setBeatWawes}
      ></ButtonPanel>
      <GamePageBottom
        setAudioCommand={setAudioCommand}
        setIsRunning={setIsRunning}
        buttonActivationTimeOutIds={buttonActivationTimeOutIds}
        setButtonActivationTimeOutIds={setButtonActivationTimeOutIds}
        isRunning={isRunning}
        setBeatWawes={setBeatWawes}
      ></GamePageBottom>
    </main>
  );
};

export default GamePage;

import { useState, useEffect } from "react";

import GamePageTop from "../Components/gameContent/gamePageTop/gamePageTop";
import ButtonPanel from "../Components/gameContent/buttonPanel";
import GamePageBottom from "../Components/gameContent/gamePageBottom";

const GamePage = ({
  audioCommand,
  setAudioCommand,
  isPlaying,
  isLoading,
  setIsLoading,
  beat,
  setBeat,
}) => {
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

  //--> resets button activations and animations when game stops
  useEffect(() => {
    if (audioCommand.actionX === "stop") {
      buttonActivationTimeOutIds.forEach((timeout) =>
        clearTimeout(timeout.timeoutId)
      );
      setButtonActivationTimeOutIds([]);
      setBeatWawes([]);
    }
  }, [audioCommand, buttonActivationTimeOutIds]);

  return (
    <main className="game-page">
      <GamePageTop
        setAudioCommand={setAudioCommand}
        isPlaying={isPlaying}
        isLoading={isLoading}
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
        buttonActivationTimeOutIds={buttonActivationTimeOutIds}
        setButtonActivationTimeOutIds={setButtonActivationTimeOutIds}
        beatWawes={beatWawes}
        setBeatWawes={setBeatWawes}
      ></ButtonPanel>
      <GamePageBottom
        setAudioCommand={setAudioCommand}
        isPlaying={isPlaying}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        beat={beat}
        buttonActivationTimeOutIds={buttonActivationTimeOutIds}
        setButtonActivationTimeOutIds={setButtonActivationTimeOutIds}
        setBeatWawes={setBeatWawes}
        setScore={setScore}
        setMissedTargets={setMissedTargets}
        setMissedShots={setMissedShots}
      ></GamePageBottom>
    </main>
  );
};

export default GamePage;

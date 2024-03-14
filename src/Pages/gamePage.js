import { useState, useEffect } from "react";

import GamePageTop from "../Components/gameContent/gamePageTop/gamePageTop";
import ButtonPanel from "../Components/gameContent/buttonPanel";
import GamePageBottom from "../Components/gameContent/gamePageBottom";
import PlayBuzz from "../Data/sounds/playBuzz";
import PlayLaser from "../Data/sounds/playLaser";

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
  const [buttonActTimeoutIds, setButtonActTimeoutIds] = useState([]);
  //==> stores the objects that generates grids animation for each goodWord
  const [beatWawes, setBeatWawes] = useState([]);

  //==> stores the current game scores value
  const [score, setScore] = useState(0);
  const [missedTargets, setMissedTargets] = useState(0);
  const [missedShots, setMissedShots] = useState([]);

  //--> resets button activations and animations when game stops
  useEffect(() => {
    if (audioCommand.actionX === "stop") {
      buttonActTimeoutIds.forEach((timeout) => clearTimeout(timeout.timeoutId));
      if (buttonActTimeoutIds.length > 0) {
        setButtonActTimeoutIds([]);
      }
      setBeatWawes([]);
    }
  }, [audioCommand, buttonActTimeoutIds, setIsLoading]);

  return (
    <main className="game-page">
      {isPlaying && <PlayBuzz event={missedShots} />}
      {isPlaying && <PlayLaser event={score} />}
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
        buttonActTimeoutIds={buttonActTimeoutIds}
        setButtonActTimeoutIds={setButtonActTimeoutIds}
        beatWawes={beatWawes}
        setBeatWawes={setBeatWawes}
      ></ButtonPanel>
      <GamePageBottom
        setAudioCommand={setAudioCommand}
        isPlaying={isPlaying}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        beat={beat}
        buttonActTimeoutIds={buttonActTimeoutIds}
        setButtonActTimeoutIds={setButtonActTimeoutIds}
        setBeatWawes={setBeatWawes}
        setScore={setScore}
        setMissedTargets={setMissedTargets}
        setMissedShots={setMissedShots}
      ></GamePageBottom>
    </main>
  );
};

export default GamePage;

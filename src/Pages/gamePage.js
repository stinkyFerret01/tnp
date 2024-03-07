import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ScreenTop from "../Components/game/gamePageTop";
import ButtonPanel from "../Components/game/buttonPanel";
import GamePageBottom from "../Components/game/gamePageBottom";

const GamePage = ({ setAudioCommand, isPlaying, beat, setBeat }) => {
  //==> stores the current game scores value
  const [score, setScore] = useState(0);
  const [missedShots, setMissedShots] = useState([]);

  const navigate = useNavigate();

  //--> resets the scores for a new game
  useEffect(() => {
    if (beat === 0) {
      setMissedShots([]);
      setScore(0);
    }
  }, [beat]);

  useEffect(() => {
    if (!isPlaying) {
      navigate("/");
    }
  }, [isPlaying, navigate]);

  return (
    <main className="game-page">
      <ScreenTop score={score} missedShots={missedShots}></ScreenTop>
      <ButtonPanel
        beat={beat}
        setBeat={setBeat}
        score={score}
        setScore={setScore}
        missedShots={missedShots}
        setMissedShots={setMissedShots}
      ></ButtonPanel>
      <GamePageBottom setAudioCommand={setAudioCommand}></GamePageBottom>
    </main>
  );
};

export default GamePage;

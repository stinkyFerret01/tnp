import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import GamePageTop from "../Components/gameContent/gamePageTop";
import ButtonPanel from "../Components/gameContent/buttonPanel";
import GamePageBottom from "../Components/gameContent/gamePageBottom";

const GamePage = ({ setAudioCommand, isPlaying, beat, setBeat }) => {
  //==> stores the current game scores value
  const [score, setScore] = useState(0);
  const [missedTargets, setMissedTargets] = useState(0);
  const [missedShots, setMissedShots] = useState([]);

  const navigate = useNavigate();

  //--> resets the scores for a new game
  useEffect(() => {
    if (beat === 0) {
      setScore(0);
      setMissedTargets(0);
      setMissedShots([]);
    }
  }, [beat]);

  useEffect(() => {
    if (!isPlaying) {
      navigate("/");
    }
  }, [isPlaying, navigate]);

  return (
    <main className="game-page">
      <GamePageTop
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
      ></ButtonPanel>
      <GamePageBottom setAudioCommand={setAudioCommand}></GamePageBottom>
    </main>
  );
};

export default GamePage;

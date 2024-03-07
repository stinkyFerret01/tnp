import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ScoreStatus from "../Components/scoreStatus";
import MissedShotsStatus from "../Components/missedShotsStatus";
import ButtonPanel from "../Components/buttonPanel";

const GamePage = ({ setAudioCommand, isPlaying, beat, setBeat }) => {
  //==> stores the current game scores value
  const [score, setScore] = useState(0);
  const [missedShots, setMissedShots] = useState([]);

  const navigate = useNavigate();

  //--> stops the game and navigates back to home
  const handleStopButtonClick = () => {
    setAudioCommand({
      actionX: "stop",
      timex: 0,
      beatx: 0,
    });
  };

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
    <div>
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
      <button onClick={handleStopButtonClick}>STOP</button>
    </div>
  );
};

export default GamePage;

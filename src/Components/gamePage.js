import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ScoreStatus from "./scoreStatus";
import MissedShotsStatus from "./missedShotsStatus";
import ButtonPanel from "./buttonPanel";

const GamePage = ({ setAudioCommand, beat, setBeat }) => {
  const [score, setScore] = useState(0);
  const [missedShots, setMissedShots] = useState([]);

  const navigate = useNavigate();

  const handleStopButtonClick = () => {
    setAudioCommand({
      actionX: "stop",
      timex: 0,
      beatx: 0,
    });
    navigate("/");
  };

  useEffect(() => {
    if (beat === 0) {
      setMissedShots([]);
      setScore(0);
    }
  }, [beat]);

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
      <button onClick={handleStopButtonClick}>HOME</button>
    </div>
  );
};

export default GamePage;

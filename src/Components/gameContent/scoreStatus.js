import React, { useEffect, useState } from "react";

import hsbfGameData from "../../beatData/hbfsGameData";

const ScoreStatus = ({ score, missedTargets }) => {
  const progress = Math.min(Math.max(score, 0), 100);

  //--> sets an animation when score increases
  const [scoreAlt, setScoreAlt] = useState("score-bar-active");
  const [missedTargetsBarAlt, setMissedTargetsBarAlt] =
    useState("missed-targets-bar");

  //--> sets an animation when missedTargets increases
  useEffect(() => {
    setScoreAlt("score-bar-active");
    setTimeout(() => {
      setScoreAlt("score-bar");
    }, 200);
  }, [score]);

  //--> sets an animation when score increases
  useEffect(() => {
    setMissedTargetsBarAlt("missed-targets-bar-active");
    setTimeout(() => {
      setMissedTargetsBarAlt("missed-targets-bar");
    }, 200);
  }, [missedTargets]);

  return (
    <div className="score-status">
      {progress}
      <div className="score-container">
        <div
          className={scoreAlt}
          style={{
            width: `${(progress * 100) / hsbfGameData.wordsNumber}%`,
          }}
        ></div>
        <div
          className={missedTargetsBarAlt}
          style={{
            width: `${(missedTargets * 100) / hsbfGameData.wordsNumber}%`,
          }}
        ></div>
      </div>
      {hsbfGameData.wordsNumber}
    </div>
  );
};

export default ScoreStatus;

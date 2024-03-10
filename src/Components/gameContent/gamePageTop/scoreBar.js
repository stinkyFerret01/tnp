import hsbfGameData from "../../../beatData/hbfsGameData";

import { useState, useEffect } from "react";

const ScoreBar = ({ score, missedTargets }) => {
  //--> stores oppacity for animation when any score value increases
  const [scoreOpacity, setScoreOpacity] = useState(0.7);
  const [missedTargetsOpacity, setMissedTargetsOpacity] = useState(0.5);

  //--> sets an animation when missedTargets increases
  useEffect(() => {
    setScoreOpacity(1);
    setTimeout(() => {
      setScoreOpacity(0.7);
    }, 200);
  }, [score]);

  //--> sets an animation when score increases
  useEffect(() => {
    setMissedTargetsOpacity(1);
    setTimeout(() => {
      setMissedTargetsOpacity(0.5);
    }, 200);
  }, [missedTargets]);

  return (
    <div className="game-element-container gec-score">
      <div
        className="score-bar"
        style={{
          width: `${(score * 100) / hsbfGameData.wordsNumber}%`,
          opacity: `${scoreOpacity}`,
        }}
      ></div>
      <div
        className="missed-targets-bar"
        style={{
          width: `${(missedTargets * 100) / hsbfGameData.wordsNumber}%`,
          opacity: `${missedTargetsOpacity}`,
        }}
      ></div>
    </div>
  );
};
export default ScoreBar;

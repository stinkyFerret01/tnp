import { useState, useEffect } from "react";

//==> data
import hsbfGameData from "../../../beatData/hbfsGameData";

//==> utils
import timeoutedSetter from "../../../utils/timeoutedSetter";

const ScoreBar = ({ score, missedTargets }) => {
  //--> stores oppacity for animation when any score value increases
  const [scoreOpacity, setScoreOpacity] = useState(0.7);
  const [missedTargetsOpacity, setMissedTargetsOpacity] = useState(0.5);

  //--> sets an animation when missedTargets increases
  useEffect(() => {
    timeoutedSetter([0.7, 1], setScoreOpacity, 200);
  }, [score]);

  //--> sets an animation when score increases
  useEffect(() => {
    timeoutedSetter([0.5, 1], setMissedTargetsOpacity, 200);
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

import React, { useEffect, useState } from "react";

import hsbfGameData from "../../beatData/hbfsGameData";

const ScoreStatus = ({ score, missedTargets }) => {
  const progress = Math.min(Math.max(score, 0), 100);

  //--> sets an animation when score increases
  const [color, setColor] = useState(null);
  const [colorAlt, setColorAlt] = useState(null);

  //--> sets an animation when score increases
  useEffect(() => {
    setColor("rgba(255, 215, 0, 0.8)");
    setTimeout(() => {
      setColor("rgba(255,215,0,0.5)");
    }, 200);
  }, [score]);

  //--> sets an animation when missedTargets increases
  useEffect(() => {
    setColorAlt("rgba(255, 0, 255, 0.8)");
    setTimeout(() => {
      setColorAlt("rgba(255, 0, 255, 0.5)");
    }, 200);
  }, [missedTargets]);

  return (
    <div className="score-container">
      <div
        style={{
          width: `${(progress * 100) / hsbfGameData.wordsNumber}%`,
          height: "3vh",
          backgroundColor: color,
        }}
      ></div>
      <div
        style={{
          width: `${(missedTargets * 100) / hsbfGameData.wordsNumber}%`,
          height: "3vh",
          backgroundColor: colorAlt,
        }}
      ></div>
    </div>
  );
};

export default ScoreStatus;

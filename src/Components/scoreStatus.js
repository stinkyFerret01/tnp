import React, { useEffect, useState } from "react";

const ScoreStatus = ({ score }) => {
  const progress = Math.min(Math.max(score, 0), 100);
  const [color, setColor] = useState("rgba(255,215,0,0.5)");

  useEffect(() => {
    setColor("rgba(255,215,0,1");
    setTimeout(() => {
      setColor("rgba(255,215,0,0.5");
    }, 200);
  }, [score]);

  return (
    <div className="score-container">
      <div
        style={{
          width: `${progress}%`,
          height: "3vh",
          backgroundColor: color,
        }}
      ></div>
    </div>
  );
};

export default ScoreStatus;

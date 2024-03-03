import React from "react";

const ScoreStatus = ({ score }) => {
  const progress = Math.min(Math.max(score, 0), 100);

  return (
    <div
      style={{
        width: "100%",
        height: "1rem",
        backgroundColor: "#ccc",
        border: "1px solid #000",
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "1rem",
          backgroundColor: "blue",
        }}
      ></div>
    </div>
  );
};

export default ScoreStatus;

import React from "react";

const MissedShotsStatus = ({ missedShots }) => {
  const progress = Math.min(Math.max(missedShots, 0), 10);

  return (
    <div
      style={{
        width: "1rem%",
        backgroundColor: "#ccc",
        border: "1px solid #000",
      }}
    >
      <div
        style={{
          width: `${progress * 10}%`,
          height: "1rem",
          backgroundColor: "red",
        }}
      ></div>
    </div>
  );
};

export default MissedShotsStatus;

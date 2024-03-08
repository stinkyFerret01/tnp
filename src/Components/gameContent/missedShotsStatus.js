import React, { useState, useEffect } from "react";

const MissedShotsStatus = ({ missedShots }) => {
  const [color, setColor] = useState(null);

  useEffect(() => {
    setColor("rgba(255, 0, 0, 0.7)");
    setTimeout(() => {
      setColor("rgba(255, 0, 0, 0.5)");
    }, 200);
  }, [missedShots]);

  return (
    <div className="missed-shots-container">
      {missedShots.map((shot) => {
        return (
          <div
            key={shot}
            className="missed-shot"
            style={{
              backgroundColor: color,
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default MissedShotsStatus;

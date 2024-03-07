import React, { useEffect } from "react";

const MissedShotsStatus = ({ missedShots }) => {
  useEffect(() => {}, [missedShots]);
  return (
    <div className="missed-shots-container">
      {missedShots.map((shot) => {
        return <div key={shot} className="missed-shot"></div>;
      })}
    </div>
  );
};

export default MissedShotsStatus;

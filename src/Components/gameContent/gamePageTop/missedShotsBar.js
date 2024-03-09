import { useState, useEffect } from "react";

const MissedShotsBar = ({ missedShots }) => {
  //--> stores oppacity for animation when any score value increases
  const [missedShotOpacity, setMissedShotOpacity] = useState(0.5);

  //--> missedShots has a different color according to their position
  const missedShotsColorDefiner = (index) => {
    if (index < 8) {
      return 1;
    } else if (index > 12) {
      return 3;
    } else {
      return 2;
    }
  };

  //--> sets an animation when a missed shot is added
  useEffect(() => {
    setMissedShotOpacity(1);
    setTimeout(() => {
      setMissedShotOpacity(0.5);
    }, 200);
  }, [missedShots]);

  return (
    <div className="game-element-container gec-missed-shots">
      {missedShots.map((shot, index) => {
        return (
          <div
            key={shot}
            className={`missed-shot m-s-${missedShotsColorDefiner(index)}`}
            style={{
              opacity: `${missedShotOpacity}`,
            }}
          ></div>
        );
      })}
    </div>
  );
};
export default MissedShotsBar;

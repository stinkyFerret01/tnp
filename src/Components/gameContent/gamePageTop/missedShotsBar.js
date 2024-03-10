import { useState, useEffect } from "react";

const MissedShotsBar = ({ beat, missedShots }) => {
  //--> stores oppacity for animation when any score value increases
  const [missedShotOpacity, setMissedShotOpacity] = useState(0.5);

  const [dangerAlert, setDangerAlert] = useState(null);

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
    if (missedShots.length > 16) {
      setDangerAlert("-Game Over-");
    } else if (missedShots.length > 15) {
      if (beat % 2 === 0) {
        setDangerAlert("**Crit!c** sy5t3m 0v3rL0ad!!");
        setTimeout(() => {
          setDangerAlert(null);
        }, 121);
      }
    } else if (missedShots.length > 13) {
      if (beat % 4 === 0) {
        setDangerAlert("-Danger!!");
        setTimeout(() => {
          setDangerAlert(null);
        }, 242);
      }
    } else if (missedShots.length > 8) {
      if (beat % 8 === 0) {
        setDangerAlert("-Alert!");
        setTimeout(() => {
          setDangerAlert(null);
        }, 484);
      }
    } else {
      setDangerAlert(null);
    }
  }, [beat, missedShots]);

  //--> sets an animation when a missed shot is added
  useEffect(() => {
    setMissedShotOpacity(1);
    setTimeout(() => {
      setMissedShotOpacity(0.5);
    }, 200);
  }, [missedShots]);

  return (
    <div className="game-element-container gec-missed-shots">
      {dangerAlert ? (
        <div
          style={
            dangerAlert === "-Alert!"
              ? { color: "orange" }
              : { color: "orangered" }
          }
        >
          {dangerAlert}
        </div>
      ) : (
        <div className="missed-shots-container">
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
      )}
    </div>
  );
};
export default MissedShotsBar;

import { useState, useEffect } from "react";

//==> data
import hsbfGameData from "../../../beatData/hbfsGameData";

//==> utils
import timeoutedSetter from "../../../utils/timeoutedSetter";

const MissedShotsBar = ({ setAudioCommand, beat, missedShots }) => {
  //--> stores oppacity for animation when any score value increases
  const [missedShotOpacity, setMissedShotOpacity] = useState(0.5);

  //--> stores alertState according to missedShots.length
  const [dangerAlert, setDangerAlert] = useState(null);

  const tempo = hsbfGameData.tempo;

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
      setDangerAlert("-GameOver-");
    } else if (missedShots.length > 15) {
      if (beat % 2 === 0) {
        timeoutedSetter(
          [null, "**Crit!c** sy5t3m 0v3rL0ad!!"],
          setDangerAlert,
          tempo
        );
      }
    } else if (missedShots.length > 13) {
      if (beat % 4 === 0) {
        timeoutedSetter([null, "-Danger!!"], setDangerAlert, tempo * 2);
      }
    } else if (missedShots.length > 8) {
      if (beat % 8 === 0) {
        timeoutedSetter([null, "-Alert!"], setDangerAlert, tempo * 4);
      }
    } else {
      setDangerAlert(null);
    }
  }, [beat, missedShots, tempo]);

  //--> sets the gameState to game over
  useEffect(() => {
    if (missedShots.length > 16 && dangerAlert === null) {
      setDangerAlert("-GameOver-");
    }
  }, [dangerAlert, missedShots]);

  //--> sets an animation when a missed shot is added
  useEffect(() => {
    timeoutedSetter([0.5, 1], setMissedShotOpacity, 200);
  }, [missedShots]);

  //--> stops the game when misseShots.length > 16
  useEffect(() => {
    if (dangerAlert === "-GameOver-") {
      setAudioCommand({ actionX: "stop" });
    }
  }, [dangerAlert, setAudioCommand]);

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

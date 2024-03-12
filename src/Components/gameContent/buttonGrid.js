import hsbfGameData from "../../Data/hbfsGameData";

import GameButton from "./gameButton";

const ButtonGrid = ({
  beatRule,
  beat,
  goodWords,
  setScore,
  setMissedTargets,
  missedShots,
  setMissedShots,
  buttonActTimeoutIds,
  setButtonActTimeoutIds,
}) => {
  return (
    beatRule && (
      <div className="button-grid">
        {hsbfGameData.wordsPosition.map((gridOpt) => {
          return (
            <div key={gridOpt.label} className="grid-option">
              <GameButton
                key={gridOpt.label}
                label={gridOpt.label}
                beat={beat}
                goodWords={goodWords}
                setScore={setScore}
                setMissedTargets={setMissedTargets}
                missedShots={missedShots}
                setMissedShots={setMissedShots}
                buttonActTimeoutIds={buttonActTimeoutIds}
                setButtonActTimeoutIds={setButtonActTimeoutIds}
              ></GameButton>
            </div>
          );
        })}
      </div>
    )
  );
};

export default ButtonGrid;

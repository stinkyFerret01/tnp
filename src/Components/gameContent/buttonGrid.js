import hsbfGameData from "../../beatData/hbfsGameData";

import GameButton from "./gameButton";

const ButtonGrid = ({
  beatRule,
  goodWords,
  setScore,
  setMissedTargets,
  missedShots,
  setMissedShots,
  setButtonActivationTimeOutIds,
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
                goodWords={goodWords}
                setScore={setScore}
                setMissedTargets={setMissedTargets}
                missedShots={missedShots}
                setMissedShots={setMissedShots}
                setButtonActivationTimeOutIds={setButtonActivationTimeOutIds}
              ></GameButton>
            </div>
          );
        })}
      </div>
    )
  );
};

export default ButtonGrid;

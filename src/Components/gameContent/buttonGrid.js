import hsbfGameData from "../../beatData/hbfsGameData";

import GameButton from "./gameButton";

const ButtonGrid = ({
  beatRule,
  goodWords,
  setScore,
  setMissedTargets,
  setMissedShots,
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
                setMissedShots={setMissedShots}
              ></GameButton>
            </div>
          );
        })}
      </div>
    )
  );
};

export default ButtonGrid;

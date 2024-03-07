import hsbfGameData from "../../beatData/hbfsGameData";

import GameButton from "./gameButton";

const ButtonGrid = ({
  beatRule,
  goodWords,
  beat,
  score,
  setScore,
  missedShots,
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
                active={
                  beatRule[beat].goodWords &&
                  beatRule[beat].goodWords.includes(gridOpt.label)
                    ? true
                    : false
                }
                word={gridOpt.label}
                goodWords={goodWords}
                score={score}
                setScore={setScore}
                missedShots={missedShots}
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

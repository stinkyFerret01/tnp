import { useEffect } from "react";

import hsbfGameData from "../../beatData/hbfsGameData";

const BeatGridGenerator = ({ beat, goodWords, beatWawes, setBeatWawes }) => {
  //---- BEATWAWES INITIALIZER ----
  useEffect(() => {
    if (goodWords !== null) {
      const newBeatWawe = {
        id: Date.now(),
        valeur: beat,
        word: goodWords[0],
      };
      setBeatWawes((prevBeatWawes) => [...prevBeatWawes, newBeatWawe]);
      setTimeout(() => {
        setBeatWawes((prevBeatWawes) =>
          prevBeatWawes.filter((btn) => btn.id !== newBeatWawe.id)
        );
      }, 4940);
      // }, 2420);
    }

    // eslint-disable-next-line
  }, [goodWords]);

  return (
    <div className="beat-grid-container">
      {beatWawes.map((btn) => (
        <div key={btn.id} className="beat-grid">
          {hsbfGameData.wordsPosition.map((gridOpt) => {
            return (
              <div
                key={gridOpt.label}
                className={
                  btn.word && gridOpt.label === btn.word
                    ? "beat-grid-option-active"
                    : "beat-grid-option-off"
                }
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default BeatGridGenerator;

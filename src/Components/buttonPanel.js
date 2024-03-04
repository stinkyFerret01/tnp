import React, { useState, useEffect } from "react";

import beatRule from "../beatData/hbfsBeatRule";
import labels from "../beatData/hsbfLabels";

import GameButton from "./gameButton";

const ButtonPanel = ({
  beat,
  setBeat,
  score,
  setScore,
  missedShots,
  setMissedShots,
}) => {
  const [beatWawes, setBeatWawes] = useState([]);
  const [goodWords, setGoodWords] = useState(null);

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
      }, 2420);
    }

    // eslint-disable-next-line
  }, [goodWords]);

  //---- GOODWORDS SETTER ----
  useEffect(() => {
    if (beat <= 1850) {
      setGoodWords(beatRule[beat].goodWords);
    } else {
      setBeat(0);
    }
  }, [beat, setBeat]);

  return (
    <div className="button-grid-container">
      <div className="button-grid">
        {labels.map((gridOpt) => {
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
      {beatWawes.map((btn) => (
        <div key={btn.id} className="beat-grid">
          {labels.map((gridOpt) => {
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

export default ButtonPanel;

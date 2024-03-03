import React, { useState, useEffect } from "react";

import beatRule from "../beatData/harderBetterFasterStronger";

import GameButton from "./gameButton";

const words = [
  { label: "Work it" },
  { label: "Make it" },
  { label: "Do it" },
  { label: "Makes us" },
  { label: "Harder" },
  { label: "Better" },
  { label: "Faster" },
  { label: "Stronger" },
  { label: "More than" },
  { label: "Hour" },
  { label: "Never" },
  { label: "" },
  { label: "Ever" },
  { label: "After" },
  { label: "Work is" },
  { label: "Over" },
];

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
        {words.map((gridOpt) => {
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
          {words.map((gridOpt) => {
            return (
              <div
                key={gridOpt.label}
                className={
                  btn.word && gridOpt.label === btn.word
                    ? "beat-grid-option-active"
                    : "beat-grid-option-off"
                }
              >
                {/* {btn.word && gridOpt.label === btn.word && (
                  <div className="targets">YOYOYO</div>
                )} */}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ButtonPanel;

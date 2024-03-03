import React, { useState, useEffect } from "react";

import beatRule from "../beatData/harderBetterFasterStronger";

import GameButton2 from "./gameButton2";

const words = [
  { label: "Work it", set: 1 },
  { label: "Make it", set: 1 },
  { label: "Do it", set: 1 },
  { label: "Makes us", set: 1 },
  { label: "Harder", set: 2 },
  { label: "Better", set: 2 },
  { label: "Faster", set: 2 },
  { label: "Stronger", set: 2 },
  { label: "More than", set: 3 },
  { label: "Hour", set: 3 },
  { label: "Never", set: 3 },
  { label: "", set: 3 },
  { label: "Ever", set: 4 },
  { label: "After", set: 4 },
  { label: "Work is", set: 4 },
  { label: "Over", set: 4 },
];

const BoutonGenerateur = ({ beat, setBeat }) => {
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
              <GameButton2
                key={gridOpt.label}
                active={
                  beatRule[beat].goodWords &&
                  beatRule[beat].goodWords.includes(gridOpt.label)
                    ? true
                    : false
                }
                word={gridOpt.label}
                goodWords={goodWords}
              ></GameButton2>
            </div>
          );
        })}
      </div>
      {beatWawes.map((btn) => (
        <div key={btn.id} className="beat-grid">
          {words.map((gridOpt) => {
            return (
              <div key={gridOpt.label} className="beat-grid-option">
                {btn.word && gridOpt.label === btn.word && <div></div>}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default BoutonGenerateur;

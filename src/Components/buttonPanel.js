import React, { useState, useEffect } from "react";

//==> build the array with the goodwords data
import beatRuleBuilder from "../utils/beatRuleBuilder";
import hsbfGameData from "../beatData/hbfsGameData";

//==> button to click when active for Player
import GameButton from "./gameButton";

const ButtonPanel = ({
  beat,
  setBeat,
  score,
  setScore,
  missedShots,
  setMissedShots,
}) => {
  //==> stores the array with the goodWords data
  const [beatRule, setBeatRule] = useState([]);

  //==> stores the objects taht generate laser animation for goodWords
  const [beatWawes, setBeatWawes] = useState([]);

  //==> stores the actuals goodWords
  const [goodWords, setGoodWords] = useState(null);

  //---- BEATRULEBUILDER ----
  useEffect(() => {
    let newBeatRule = beatRuleBuilder(hsbfGameData);
    setBeatRule(newBeatRule);
  }, []);

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
    if (beatRule.length > 0 && beat <= 1850) {
      setGoodWords(beatRule[beat].goodWords);
    } else {
      setBeat(0);
    }
  }, [beat, setBeat, beatRule]);

  return (
    beatRule.length > 0 && (
      <div className="button-grid-container">
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
    )
  );
};

export default ButtonPanel;

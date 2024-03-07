import React, { useState, useEffect } from "react";

//==> build the array with the goodwords data
import beatRuleBuilder from "../../utils/beatRuleBuilder";
import hsbfGameData from "../../beatData/hbfsGameData";

//==> the buttons displayed for the Player
import ButtonGrid from "./buttonGrid";

//==> the effects that animates a word detection
import BeatGridGenerator from "./beatGridGenerator";

const ButtonPanel = ({
  beat,
  setBeat,
  score,
  setScore,
  missedShots,
  setMissedShots,
}) => {
  //==> stores the array with the goodWords data
  const [beatRule, setBeatRule] = useState(null);

  //==> stores the actuals goodWords
  const [goodWords, setGoodWords] = useState(null);

  //---- BEATRULEBUILDER ----
  useEffect(() => {
    let newBeatRule = beatRuleBuilder(hsbfGameData);
    setBeatRule(newBeatRule);
  }, []);

  //---- GOODWORDS SETTER ----
  useEffect(() => {
    if (beatRule) {
      setGoodWords(beatRule[beat].goodWords);
    } else {
      setBeat(0);
    }
  }, [beat, setBeat, beatRule]);

  return (
    beatRule && (
      <div className="button-panel">
        <ButtonGrid
          beatRule={beatRule}
          beat={beat}
          goodWords={goodWords}
          score={score}
          setScore={setScore}
          missedShots={missedShots}
          setMissedShots={setMissedShots}
        ></ButtonGrid>
        <BeatGridGenerator
          beat={beat}
          goodWords={goodWords}
        ></BeatGridGenerator>
      </div>
    )
  );
};

export default ButtonPanel;

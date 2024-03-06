import React, { useState, useEffect } from "react";

// import beatRule from "../beatData/hbfsBeatRule";
// import beatRuleBuilder from "../beatData/hbfsBeatRule";
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
  const [beatRule, setBeatRule] = useState([]);
  const [beatWawes, setBeatWawes] = useState([]);
  const [goodWords, setGoodWords] = useState(null);

  //---- BEATRULEBUILDER ----
  useEffect(() => {
    const wordsPosition = [
      {
        label: "Work it",
        beats: [0, 256, 384, 512, 576, 640, 704],
      },
      {
        label: "Make it",
        beats: [8, 264, 392, 520, 584, 648, 712],
      },
      {
        label: "Do it",
        beats: [16, 272, 400, 528, 592, 656, 720],
      },
      {
        label: "Makes us",
        beats: [24, 280, 408, 536, 600, 664, 728],
      },
      {
        label: "Harder",
        beats: [68, 324, 388, 516, 580, 644, 708],
      },
      {
        label: "Better",
        beats: [76, 332, 396, 524, 588, 652, 716],
      },
      {
        label: "Faster",
        beats: [84, 340, 404, 532, 596, 660, 724],
      },
      {
        label: "Stronger",
        beats: [92, 348, 412, 540, 604, 668, 732],
      },

      // 2nd
      {
        label: "More than",
        beats: [128, 448, 544],
      },
      {
        label: "Hour",
        beats: [136, 144, 456, 464, 552, 560],
      },
      {
        label: "Never",
        beats: [152, 472, 568],
      },
      {
        label: "",
        beats: [-32, -64, -96, -128, -160, -192, -224, -256],
      },
      {
        label: "Ever",
        beats: [196, 452, 548],
      },
      {
        label: "After",
        beats: [204, 460, 556],
      },
      {
        label: "Work is",
        beats: [212, 468, 564],
      },
      {
        label: "Over",
        beats: [220, 476, 572],
      },
    ];

    const beatRuleBuilder = () => {
      let beatRuleWIP = [];
      for (let i = 0; i < 1880; i++) {
        let beatToCheck = i - 416;
        let beat = { beat: i, goodWords: [] };
        for (let j = 0; j < wordsPosition.length; j++) {
          let labelToCheck = wordsPosition[j];
          if (labelToCheck.beats.includes(beatToCheck)) {
            beat.goodWords.push(labelToCheck.label);
          }
        }
        if (beat.goodWords.length === 0) {
          beat.goodWords = null;
        }
        beatRuleWIP.push(beat);
      }
      return beatRuleWIP;
    };
    setBeatRule(beatRuleBuilder());
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
    )
  );
};

export default ButtonPanel;

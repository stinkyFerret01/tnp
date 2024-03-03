import React, { useState, useEffect } from "react";

import beatRule from "../beatData/harderBetterFasterStronger";

import GameButton from "./gameButton";
import GameButton2 from "./gameButton2";
// import TargetGenerator from "./targetGenerator";

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
  const [boutons, setBoutons] = useState([]);
  const [goodWords, setGoodWords] = useState(null);

  const checkActiveButtons = (label) => {
    return boutons.some((btn) => btn.word === label);
  };
  function contientLabel(tableau, label) {
    return tableau.some((objet) => objet.word === label);
  }

  useEffect(() => {
    // Générer un nouveau bouton à chaque modification du beat
    if (goodWords !== null) {
      const nouveauBouton = {
        id: Date.now(),
        valeur: beat,
        word: goodWords[0],
      };
      setBoutons((prevBoutons) => [...prevBoutons, nouveauBouton]);
      setTimeout(() => {
        setBoutons((prevBoutons) =>
          prevBoutons.filter((btn) => btn.id !== nouveauBouton.id)
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
      {/* <TargetGenerator
        targets={boutons}
        setTargets={setBoutons}
        beat={beat}
        goodWords={goodWords}
      ></TargetGenerator> */}
      <div className="button-grid">
        {words.map((gridOpt) => {
          return (
            <div key={gridOpt.label} className="grid-option">
              <button
                className={
                  checkActiveButtons(gridOpt.label) ? "button2on" : "button2off"
                }
              >
                {gridOpt.label.toLocaleUpperCase()}
              </button>
            </div>
          );
        })}
      </div>
      {boutons.map((btn) => (
        <div key={btn.id} className="beat-grid">
          {words.map((gridOpt, index) => {
            return (
              <div key={gridOpt.label} className="beat-grid-option">
                {btn.word && gridOpt.label === btn.word && (
                  <GameButton
                    key={btn.id}
                    word={btn.word}
                    goodWords={goodWords}
                  ></GameButton>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default BoutonGenerateur;

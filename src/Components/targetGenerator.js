import { useEffect } from "react";

import GameButton from "./gameButton";

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

const TargetGenerator = ({ targets, setTargets, goodWords, beat }) => {
  useEffect(() => {
    // Générer un nouveau bouton à chaque modification du beat
    if (goodWords !== null) {
      const nouveauBouton = {
        id: Date.now(),
        valeur: beat,
        word: goodWords[0],
      };
      setTargets((prevBoutons) => [...prevBoutons, nouveauBouton]);
      setTimeout(() => {
        setTargets((prevBoutons) =>
          prevBoutons.filter((btn) => btn.id !== nouveauBouton.id)
        );
      }, 2420);
    }

    // eslint-disable-next-line
  }, [goodWords]);
  return (
    <div className="button-grid-container2">
      {targets.map((btn) => (
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

export default TargetGenerator;

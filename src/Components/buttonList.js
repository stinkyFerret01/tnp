// ButtonList est la listes des bouttons de jeux disponobles
import { useState, useEffect } from "react";
import beatRule from "../beatData/harderBetterFasterStronger";
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

const ButtonList = ({ beat, setBeat }) => {
  const [goodWords, setGoodWords] = useState(null);

  //---- GOODWORDS SETTER ----
  useEffect(() => {
    if (beat <= 1850) {
      setGoodWords(beatRule[beat].goodWords);
    } else {
      setBeat(0);
    }
  }, [beat, setBeat]);

  return (
    <div className="button-grid">
      {words.map((gridOpt) => {
        return (
          <div key={gridOpt.label} className="grid-option">
            <button
              // className={
              //   checkActiveButtons(gridOpt.label) ? "button2on" : "button2off"
              // }
              className={"button2on"}
            >
              {gridOpt.label.toLocaleUpperCase()}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ButtonList;

// ButtonList est la listes des bouttons de jeux disponobles
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

const ButtonList = ({ goodWords }) => {
  return (
    <div className="button-list">
      {words.map((word, index) => {
        return (
          <GameButton
            word={word.label}
            goodWords={goodWords}
            key={index}
          ></GameButton>
        );
      })}
    </div>
  );
};

export default ButtonList;

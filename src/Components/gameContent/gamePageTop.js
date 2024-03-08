import ScoreStatus from "./scoreStatus";
import MissedShotsStatus from "./missedShotsStatus";

const GamePageTop = ({ score, missedShots, missedTargets }) => {
  return (
    <div className="game-page-top">
      <ScoreStatus score={score} missedTargets={missedTargets}></ScoreStatus>
      <MissedShotsStatus missedShots={missedShots}></MissedShotsStatus>
    </div>
  );
};

export default GamePageTop;

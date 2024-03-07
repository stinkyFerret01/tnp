import ScoreStatus from "./scoreStatus";
import MissedShotsStatus from "./missedShotsStatus";

const ScreenTop = ({ score, missedShots }) => {
  return (
    <div className="game-top">
      <ScoreStatus score={score}></ScoreStatus>
      <MissedShotsStatus missedShots={missedShots}></MissedShotsStatus>
    </div>
  );
};

export default ScreenTop;

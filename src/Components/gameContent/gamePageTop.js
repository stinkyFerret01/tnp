import ScoreStatus from "./scoreStatus";

const GamePageTop = ({
  isPlaying,
  isRunning,
  beat,
  score,
  missedShots,
  missedTargets,
}) => {
  return (
    <div className="game-page-top">
      <ScoreStatus
        isPlaying={isPlaying}
        isRunning={isRunning}
        beat={beat}
        score={score}
        missedTargets={missedTargets}
        missedShots={missedShots}
      ></ScoreStatus>
    </div>
  );
};

export default GamePageTop;

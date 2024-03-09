import ScoreStatus from "./scoreStatus";

const GamePageTop = ({
  isPlaying,
  isLoading,
  beat,
  score,
  missedShots,
  missedTargets,
}) => {
  return (
    <div className="game-page-top">
      <ScoreStatus
        isPlaying={isPlaying}
        isLoading={isLoading}
        beat={beat}
        score={score}
        missedTargets={missedTargets}
        missedShots={missedShots}
      ></ScoreStatus>
    </div>
  );
};

export default GamePageTop;

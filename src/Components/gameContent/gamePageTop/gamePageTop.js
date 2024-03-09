import hsbfGameData from "../../../beatData/hbfsGameData";

import ScoreBar from "./scoreBar";
import BeatDisplayer from "./beatDisplayer";
import MissedShotsBar from "./missedShotsBar";
import GameStateBar from "./gameStateBar";

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
      <div className="g-p-top-line">
        <div style={{ display: "flex", margin: "0.6%" }}>
          <div className="game-element-container gec-num">{score}</div>
          <div
            className="game-element-container gec-num"
            style={{ color: "lime" }}
          >
            {hsbfGameData.wordsNumber}
          </div>
        </div>
        <ScoreBar score={score} missedTargets={missedTargets}></ScoreBar>
        <BeatDisplayer beat={beat}></BeatDisplayer>
      </div>
      <div className="g-p-bottom-line">
        <MissedShotsBar missedShots={missedShots}></MissedShotsBar>
        <GameStateBar
          isLoading={isLoading}
          isPlaying={isPlaying}
        ></GameStateBar>
      </div>
    </div>
  );
};

export default GamePageTop;

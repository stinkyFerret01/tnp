import hsbfGameData from "../../../beatData/hbfsGameData";

import ScoreBar from "./scoreBar";
import BeatDisplayer from "./beatDisplayer";
import MissedShotsBar from "./missedShotsBar";
import GameStateBar from "./gameStateBar";

const GamePageTop = ({
  setAudioCommand,
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
        <div
          style={{
            display: "flex",
            padding: "0.6%",
            alignItems: "center",
          }}
        >
          <div
            className="game-element-container gec-num"
            style={{ color: "gold" }}
          >
            {score}
          </div>
          <div className="game-element-container gec-num">
            {hsbfGameData.wordsNumber}
          </div>
        </div>
        <ScoreBar score={score} missedTargets={missedTargets}></ScoreBar>
        <BeatDisplayer beat={beat}></BeatDisplayer>
      </div>
      <div className="g-p-bottom-line">
        <MissedShotsBar
          setAudioCommand={setAudioCommand}
          beat={beat}
          missedShots={missedShots}
        ></MissedShotsBar>
        <GameStateBar
          isLoading={isLoading}
          isPlaying={isPlaying}
        ></GameStateBar>
      </div>
    </div>
  );
};

export default GamePageTop;

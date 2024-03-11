import { useState, useEffect } from "react";

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
  const [bestScore, setBestScore] = useState(localStorage.getItem("bestScore"));

  const bestScoreSetter = () => {
    const registeredBestScore = localStorage.getItem("bestScore");
    if (registeredBestScore) {
      if (registeredBestScore < score) {
        localStorage.setItem("bestScore", score);
        setBestScore(score);
      }
    } else if (score > 0) {
      localStorage.setItem("bestScore", score);
      setBestScore(score);
    } else {
      setBestScore("null");
    }
  };

  useEffect(() => {
    bestScoreSetter();

    // eslint-disable-next-line
  }, [score]);

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
          <div
            className="game-element-container gec-beat"
            style={
              bestScore !== "null" ? { color: "lime" } : { color: "orangered" }
            }
          >
            {bestScore}
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

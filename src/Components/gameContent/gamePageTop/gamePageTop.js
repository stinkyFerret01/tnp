import { useState, useEffect } from "react";

import ScoreBar from "./scoreBar";
import BeatDisplayer from "./beatDisplayer";
import MissedShotsBar from "./missedShotsBar";
import GameStateBar from "./gameStateBar";
import hsbfGameData from "../../../beatData/hbfsGameData";

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
          className="game-element-container gec-num"
          style={{ color: "gold" }}
        >
          {score}
        </div>
        <div
          className="game-element-container gec-num"
          style={
            bestScore !== "null" ? { color: "lime" } : { color: "orangered" }
          }
        >
          {bestScore}
        </div>
        <ScoreBar score={score} missedTargets={missedTargets}></ScoreBar>
        <div
          className="game-element-container gec-num"
          style={{ color: "lime" }}
        >
          {hsbfGameData.wordsNumber}
        </div>
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
        <BeatDisplayer beat={beat}></BeatDisplayer>
      </div>
    </div>
  );
};

export default GamePageTop;

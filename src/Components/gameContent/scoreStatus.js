import React, { useEffect, useState } from "react";

import hsbfGameData from "../../beatData/hbfsGameData";

import BeatDisplayer from "./beatDisplayer";

const missedShotsColorDefiner = (index) => {
  if (index < 8) {
    return 1;
  } else if (index > 12) {
    return 3;
  } else {
    return 2;
  }
};

const ScoreStatus = ({
  isPlaying,
  isLoading,
  beat,
  score,
  missedTargets,
  missedShots,
}) => {
  const [gameState, setGameState] = useState("-Off");

  //--> stores oppacity for animation when any score value increases
  const [missedShotOpacity, setMissedShotOpacity] = useState(0.5);
  const [scoreOpacity, setScoreOpacity] = useState(0.5);
  const [missedTargetsOpacity, setMissedTargetsOpacity] = useState(0.5);

  //--> sets an animation when missedTargets increases
  useEffect(() => {
    setScoreOpacity(1);
    setTimeout(() => {
      setScoreOpacity(0.5);
    }, 200);
  }, [score]);

  //--> sets an animation when score increases
  useEffect(() => {
    setMissedTargetsOpacity(1);
    setTimeout(() => {
      setMissedTargetsOpacity(0.5);
    }, 200);
  }, [missedTargets]);

  //--> sets an animation when a missed shot is added
  useEffect(() => {
    setMissedShotOpacity(1);
    setTimeout(() => {
      setMissedShotOpacity(0.5);
    }, 200);
  }, [missedShots]);

  //--> sets the gameState
  useEffect(() => {
    if (isPlaying && !isLoading) {
      setGameState("-Playing...");
    } else {
      if (isLoading) {
        setGameState("-Loading...");
      } else {
        setGameState("-Off");
      }
    }
  }, [isPlaying, isLoading]);

  return (
    <div className="score-status">
      <div className="score-status-top-line">
        <div style={{ display: "flex", margin: "0.6%" }}>
          <div className="game-element-container gec-num">{score}</div>
          <div
            className="game-element-container gec-num"
            style={{ color: "lime" }}
          >
            {hsbfGameData.wordsNumber}
          </div>
        </div>
        <div className="game-element-container gec-score">
          <div
            className="score-bar"
            style={{
              width: `${(score * 100) / hsbfGameData.wordsNumber}%`,
              opacity: `${scoreOpacity}`,
            }}
          ></div>
          <div
            className="missed-targets-bar"
            style={{
              width: `${(missedTargets * 100) / hsbfGameData.wordsNumber}%`,
              opacity: `${missedTargetsOpacity}`,
            }}
          ></div>
        </div>
        <BeatDisplayer beat={beat}></BeatDisplayer>
      </div>
      <div className="score-status-bottom-line">
        <div className="game-element-container gec-missed-shots">
          {missedShots.map((shot, index) => {
            return (
              <div
                key={shot}
                className={`missed-shot m-s-${missedShotsColorDefiner(index)}`}
                style={{
                  opacity: `${missedShotOpacity}`,
                }}
              ></div>
            );
          })}
        </div>
        <div className="game-element-container gec-game-state">
          <p
            style={
              gameState === "-Off" ? { color: "orangered" } : { color: "lime" }
            }
          >
            {gameState}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScoreStatus;

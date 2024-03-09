import { useState, useEffect } from "react";

const GameStateBar = ({ isLoading, isPlaying }) => {
  const [gameState, setGameState] = useState("-Off");

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
    <div className="game-element-container gec-game-state">
      <p
        style={
          gameState === "-Off" ? { color: "orangered" } : { color: "lime" }
        }
      >
        {gameState}
      </p>
    </div>
  );
};

export default GameStateBar;

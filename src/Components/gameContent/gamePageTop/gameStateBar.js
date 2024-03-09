import { useState, useEffect } from "react";

const GameStateBar = ({ isLoading, isPlaying }) => {
  const [gameState, setGameState] = useState("-Off");

  //--> sets the gameState
  useEffect(() => {
    if (isPlaying && isLoading === 100) {
      setGameState("-Playing...");
    } else {
      if (isLoading > 0 && isLoading < 100) {
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

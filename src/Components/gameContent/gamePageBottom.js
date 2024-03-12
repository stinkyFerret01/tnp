import { useNavigate } from "react-router-dom";

import hsbfGameData from "../../Data/hbfsGameData";

const GamePageBottom = ({
  setAudioCommand,
  isPlaying,
  isLoading,
  setIsLoading,
  beat,
  buttonActTimeoutIds,
  setButtonActTimeoutIds,
  setBeatWawes,
  setScore,
  setMissedTargets,
  setMissedShots,
}) => {
  const navigate = useNavigate();

  //--> navigates back to home
  const handleBackButtonClick = () => {
    if (!isPlaying && (isLoading === 0 || isLoading === 100)) {
      setIsLoading(0);
      setTimeout(() => {
        navigate("/");
      }, 100);
      navigate("/");
    }
  };

  //--> stops the game
  const handleStopButtonClick = () => {
    if (isPlaying && isLoading === 100) {
      setAudioCommand({
        actionX: "stop",
      });
    }
  };

  //--> skips the intro
  const handleSkipButtonClick = () => {
    if (isPlaying) {
      buttonActTimeoutIds.forEach((timeout) => clearTimeout(timeout.timeoutId));
      setButtonActTimeoutIds([]);
      setBeatWawes([]);
      setAudioCommand({
        actionX: "skip",
        timex: hsbfGameData.skipTimePosition,
      });
    }
  };

  //--> restarts the game
  const handleRestartButtonClick = () => {
    if (!isPlaying && (isLoading === 0 || isLoading === 100)) {
      setAudioCommand({
        actionX: "play",
      });
    }

    //--> resets the scores for a new game
    setScore(0);
    setMissedTargets(0);
    setMissedShots([]);
  };

  return (
    <div className="game-page-bottom">
      <button
        className="game-element-container gec-command"
        style={
          !isPlaying && (isLoading === 0 || isLoading === 100)
            ? { opacity: "1", cursor: "pointer" }
            : { opacity: "0.4", cursor: "default" }
        }
        onClick={handleBackButtonClick}
      >
        BACK
      </button>
      <button
        className="game-element-container gec-command"
        style={
          isPlaying && isLoading === 100
            ? { opacity: "1", cursor: "pointer" }
            : { opacity: "0.4", cursor: "default" }
        }
        onClick={handleStopButtonClick}
      >
        STOP
      </button>
      <button
        className="game-element-container gec-command"
        style={
          !isPlaying || beat > hsbfGameData.beatMod - 32
            ? { opacity: "0.4", cursor: "default" }
            : { opacity: "1", cursor: "pointer" }
        }
        onClick={handleSkipButtonClick}
      >
        SKIP
      </button>
      <button
        className="game-element-container gec-command"
        style={
          !isPlaying && (isLoading === 0 || isLoading === 100)
            ? { opacity: "1", cursor: "pointer" }
            : { opacity: "0.4", cursor: "default" }
        }
        onClick={handleRestartButtonClick}
      >
        RESET
      </button>
    </div>
  );
};

export default GamePageBottom;

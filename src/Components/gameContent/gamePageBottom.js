import { useNavigate } from "react-router-dom";

import hsbfGameData from "../../beatData/hbfsGameData";

const GamePageBottom = ({
  setAudioCommand,
  isPlaying,
  isLoading,
  beat,
  buttonActivationTimeOutIds,
  setButtonActivationTimeOutIds,
  setBeatWawes,
  setScore,
  setMissedTargets,
  setMissedShots,
}) => {
  const navigate = useNavigate();

  //--> navigates back to home
  const handleBackButtonClick = () => {
    if (isLoading === 0) {
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
      buttonActivationTimeOutIds.forEach((timeout) =>
        clearTimeout(timeout.timeoutId)
      );
      setButtonActivationTimeOutIds([]);
      setBeatWawes([]);
      setAudioCommand({
        actionX: "skip",
        timex: hsbfGameData.skipTimePosition,
      });
    }
  };

  //--> restarts the game
  const handleRestartButtonClick = () => {
    if (isLoading === 0 && !isPlaying) {
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
        style={{ opacity: isLoading > 0 || isPlaying ? "0.4" : "1" }}
        onClick={handleBackButtonClick}
      >
        BACK
      </button>
      <button
        className="game-element-container gec-command"
        style={{ opacity: isPlaying && isLoading === 100 ? "1" : "0.4" }}
        onClick={handleStopButtonClick}
      >
        STOP
      </button>
      <button
        className="game-element-container gec-command"
        style={{
          opacity: !isPlaying || beat > hsbfGameData.beatMod - 32 ? "0.4" : "1",
        }}
        onClick={handleSkipButtonClick}
      >
        SKIP
      </button>
      <button
        className="game-element-container gec-command"
        style={{ opacity: isLoading > 0 || isPlaying ? "0.4" : "1" }}
        onClick={handleRestartButtonClick}
      >
        RESET
      </button>
    </div>
  );
};

export default GamePageBottom;

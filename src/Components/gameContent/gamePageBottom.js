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
}) => {
  const navigate = useNavigate();

  //--> stops the game
  const handleBackButtonClick = () => {
    if (!isLoading) {
      navigate("/");
    }
  };

  //--> navigates back to home
  const handleStopButtonClick = () => {
    if (isPlaying) {
      buttonActivationTimeOutIds.forEach((timeout) =>
        clearTimeout(timeout.timeoutId)
      );

      setButtonActivationTimeOutIds([]);
      setBeatWawes([]);
      setAudioCommand({
        actionX: "stop",
        timex: 0,
        beatx: 0,
      });
    }
  };

  //--> navigates back to home
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
        beatx: 0,
      });
    }
  };

  //--> restart the game
  const handleRestartButtonClick = () => {
    if (!isLoading && !isPlaying) {
      setAudioCommand({
        actionX: "play",
        timex: 0,
        beatx: 0,
      });
    }
  };

  return (
    <div className="game-page-bottom">
      <button
        className="game-element-container gec-command"
        style={{ opacity: isLoading || isPlaying ? "0.4" : "1" }}
        onClick={handleBackButtonClick}
      >
        BACK
      </button>
      <button
        className="game-element-container gec-command"
        style={{ opacity: !isPlaying ? "0.4" : "1" }}
        onClick={handleStopButtonClick}
      >
        STOP
      </button>
      <button
        className="game-element-container gec-command"
        style={{ opacity: !isPlaying ? "0.4" : "1" }}
        onClick={handleSkipButtonClick}
      >
        SKIP
      </button>
      <button
        className="game-element-container gec-command"
        style={{ opacity: isLoading || isPlaying ? "0.4" : "1" }}
        onClick={handleRestartButtonClick}
      >
        RESTART
      </button>
    </div>
  );
};

export default GamePageBottom;

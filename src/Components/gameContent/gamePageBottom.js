import { useNavigate } from "react-router-dom";

const GamePageBottom = ({
  setAudioCommand,
  isRunning,
  setIsRunning,
  beat,
  buttonActivationTimeOutIds,
  setButtonActivationTimeOutIds,
  setBeatWawes,
}) => {
  const toggleIsRuning = () => {
    setIsRunning(!isRunning);
  };

  const navigate = useNavigate();

  //--> stops the game
  const handleBackButtonClick = () => {
    if (!isRunning) {
      // toggleIsRuning();
      navigate("/");
    }
  };

  //--> navigates back to home
  const handleStopButtonClick = () => {
    if (isRunning) {
      buttonActivationTimeOutIds.forEach(clearTimeout);
      setButtonActivationTimeOutIds([]);
      setBeatWawes([]);
      toggleIsRuning();
      setAudioCommand({
        actionX: "stop",
        timex: 0,
        beatx: 0,
      });
    }
  };

  //--> navigates back to home
  const handleSkipButtonClick = () => {
    if (isRunning) {
      buttonActivationTimeOutIds.forEach(clearTimeout);
      setButtonActivationTimeOutIds([]);
      setBeatWawes([]);
      setAudioCommand({
        actionX: "skip",
        timex: 47,
        beatx: 0,
      });
    }
  };

  //--> restart the game
  const handleRestartButtonClick = () => {
    if (!isRunning) {
      toggleIsRuning();
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
        style={{ opacity: isRunning ? "0.4" : "1" }}
        onClick={handleBackButtonClick}
      >
        BACK
      </button>
      <button
        className="game-element-container gec-command"
        style={{ opacity: !isRunning ? "0.4" : "1" }}
        onClick={handleStopButtonClick}
      >
        STOP
      </button>
      <button
        className="game-element-container gec-command"
        style={{ opacity: !isRunning ? "0.4" : "1" }}
        onClick={handleSkipButtonClick}
      >
        SKIP
      </button>
      <button
        className="game-element-container gec-command"
        style={{ opacity: isRunning ? "0.4" : "1" }}
        onClick={handleRestartButtonClick}
      >
        RESTART
      </button>
    </div>
  );
};

export default GamePageBottom;

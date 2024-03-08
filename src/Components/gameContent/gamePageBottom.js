const GamePageBottom = ({ setAudioCommand }) => {
  //--> stops the game and navigates back to home
  const handleStopButtonClick = () => {
    setAudioCommand({
      actionX: "stop",
      timex: 0,
      beatx: 0,
    });
  };

  return (
    <div className="game-page-bottom">
      <button onClick={handleStopButtonClick}>STOP</button>
    </div>
  );
};

export default GamePageBottom;

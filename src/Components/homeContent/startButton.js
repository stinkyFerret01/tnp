const StartButton = ({ isLoading, setIsLoading, isPlaying }) => {
  //--> triggs the game commands to start the audio process
  const handlePlayButtonClick = () => {
    setIsLoading(true);
  };

  return (
    <div>
      {!isLoading || !isPlaying ? (
        <button className="start-button" onClick={handlePlayButtonClick}>
          PLAY
        </button>
      ) : (
        <div>LOADING</div>
      )}
    </div>
  );
};

export default StartButton;

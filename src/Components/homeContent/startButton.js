const StartButton = ({ isLoading, setIsLoading, isPlaying }) => {
  //--> triggs the game commands to start the audio process
  const handlePlayButtonClick = () => {
    setIsLoading(true);
  };

  return (
    <div>
      {isLoading || isPlaying ? (
        <div>LOADING</div>
      ) : (
        <button className="start-button" onClick={handlePlayButtonClick}>
          PLAY
        </button>
      )}
    </div>
  );
};

export default StartButton;

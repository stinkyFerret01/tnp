const StartButton = ({ isLoading, setIsLoading, isPlaying }) => {
  //--> triggs the game commands to start the audio process
  const handlePlayButtonClick = () => {
    // setIsLoading(true);
    setIsLoading(5);
  };

  return (
    <div>
      {/* {isLoading || isPlaying ? ( */}
      {isLoading > 0 || isPlaying ? (
        <div style={{ color: "white" }}>LOADING {isLoading}</div>
      ) : (
        <button className="start-button" onClick={handlePlayButtonClick}>
          PLAY
        </button>
      )}
    </div>
  );
};

export default StartButton;

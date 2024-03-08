const StartButton = ({ isLoading, setIsLoading }) => {
  //--> triggs the game commands to start the audio process
  const handlePlayButtonClick = () => {
    setIsLoading(true);
  };

  return (
    <div>
      {!isLoading ? (
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

// import laser from "../../Data/sounds/laser.mp3";

const StartButton = ({
  isLoading,
  setIsLoading,
  isPlaying,
  displayTermComHelper,
}) => {
  //--> plays a sound when clicking start
  // const laserPlayer = () => {
  //   const audio = new Audio(laser);
  //   audio.play();
  // };

  //--> triggs the game commands to start the audio process
  const handlePlayButtonClick = () => {
    // laserPlayer();
    setIsLoading(5);
  };

  return (
    !displayTermComHelper && (
      <div>
        {isLoading > 0 || isPlaying ? (
          <div>
            <div className="loading-bar-container">
              <div
                className="loading-bar"
                style={{
                  width: `${isLoading}%`,
                }}
              ></div>
            </div>
            <div className="game-text-container centered">
              Loading {isLoading} %
            </div>
          </div>
        ) : (
          <button className="play-button" onClick={handlePlayButtonClick}>
            <svg
              fill="rgba(0, 255, 0, 0.6)"
              box-shadow="0 0 5px rgba(0, 255, 0, 0.2),
            0 0 8px rgba(0, 255, 0, 0.2),
            0 0 18px rgba(0, 255, 0, 0.2),
            0 0 60px rgba(0, 255, 0, 0.2);"
              height="2rem"
              width="2rem"
              version="1.1"
              id="Capa_1"
              viewBox="0 0 155.908 155.908"
            >
              <g id="SVGRepo_#000000gCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <g>
                  <path d="M143.878,58.015L46.02,6.45c-9.816-5.172-21.348-4.838-30.848,0.894C5.672,13.076,0,23.122,0,34.218v87.473 c0,11.096,5.672,21.142,15.172,26.874c5.018,3.028,10.601,4.549,16.2,4.549c5.001,0,10.016-1.215,14.647-3.655l97.858-51.566 c7.42-3.91,12.03-11.55,12.03-19.938S151.298,61.926,143.878,58.015z M135.486,81.968l-97.858,51.566 c-4.249,2.239-9.045,2.101-13.157-0.381C20.358,130.671,18,126.493,18,121.69V34.218c0-4.803,2.358-8.981,6.471-11.462 c2.169-1.309,4.529-1.966,6.898-1.966c2.122,0,4.251,0.527,6.259,1.585l97.858,51.565c2.186,1.152,2.422,3.191,2.422,4.014 S137.672,80.816,135.486,81.968z"></path>{" "}
                </g>
              </g>
            </svg>
          </button>
        )}
      </div>
    )
  );
};

export default StartButton;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = ({ setAudioCommand, isPlaying }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    if (isPlaying) {
      navigate("/game");
    }
  }, [isPlaying, navigate]);

  //--> starts the game and navigates to gamePage when isPlaying trigged
  const handlePlayButtonClick = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    if (isLoading) {
      setAudioCommand({
        actionX: "play",
        timex: 0,
        beatx: 0,
      });
    }
  }, [isLoading, setAudioCommand]);

  return !isLoading ? (
    <div>
      <button onClick={handlePlayButtonClick}>PLAY</button>
    </div>
  ) : (
    <div>LOADING</div>
  );
};

export default HomePage;

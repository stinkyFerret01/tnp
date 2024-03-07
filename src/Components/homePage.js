import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = ({ setAudioCommand, isPlaying }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isPlaying) {
      navigate("/game");
      setTimeout(() => {
        setIsLoading(false);
      }, 4000);
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

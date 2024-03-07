import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = ({ setAudioCommand, isPlaying }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  //--> triggs the game commands to start the audio process
  const handlePlayButtonClick = () => {
    setIsLoading(true);
  };

  //--> starts the game (trigging isPlaying when audio is starting)
  useEffect(() => {
    if (isLoading) {
      setAudioCommand({
        actionX: "play",
        timex: 0,
        beatx: 0,
      });
    }
  }, [isLoading, setAudioCommand]);

  //--> navigates to gamePage when isPlaying gets trigged
  useEffect(() => {
    if (isPlaying) {
      navigate("/game");
      setTimeout(() => {
        setIsLoading(false);
      }, 4000);
    }
  }, [isPlaying, navigate]);

  return (
    <main className="home-page">
      {!isLoading ? (
        <button onClick={handlePlayButtonClick}>PLAY</button>
      ) : (
        <div>LOADING</div>
      )}
    </main>
  );
};

export default HomePage;

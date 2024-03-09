import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import StartButton from "../Components/homeContent/startButton";

const HomePage = ({ setAudioCommand, isPlaying, isLoading, setIsLoading }) => {
  const navigate = useNavigate();

  //--> starts the game (trigging isPlaying when audio is starting)
  useEffect(() => {
    if (isLoading === 5 && !isPlaying) {
      setAudioCommand({
        actionX: "play",
      });
    }
  }, [isLoading, isPlaying, setAudioCommand]);

  //--> navigates to gamePage when isPlaying gets trigged
  useEffect(() => {
    if (isLoading === 100) {
      navigate("/game");
    }
  }, [isLoading, navigate]);

  return (
    <main className="home-page">
      <StartButton
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isPlaying={isPlaying}
      ></StartButton>
    </main>
  );
};

export default HomePage;

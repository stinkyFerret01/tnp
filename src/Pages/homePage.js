import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import StartButton from "../Components/homeContent/startButton";

const HomePage = ({ setAudioCommand, isPlaying, isLoading, setIsLoading }) => {
  const navigate = useNavigate();

  //--> starts the game (trigging isPlaying when audio is starting)
  useEffect(() => {
    if (isLoading && !isPlaying) {
      setAudioCommand({
        actionX: "play",
        timex: 0,
        beatx: 0,
      });
    }
  }, [isLoading, isPlaying, setAudioCommand]);

  //--> navigates to gamePage when isPlaying gets trigged
  useEffect(() => {
    if (isPlaying) {
      navigate("/game");
      setTimeout(() => {
        setIsLoading(false);
      }, 4000);
    }
  }, [isPlaying, navigate, setIsLoading]);

  return (
    <main className="home-page">
      <StartButton
        isLoading={isLoading}
        isPlaying={isPlaying}
        setIsLoading={setIsLoading}
      ></StartButton>
    </main>
  );
};

export default HomePage;

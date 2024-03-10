import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import WrittingText from "../Components/homeContent/writtingText";
import StartButton from "../Components/homeContent/startButton";

const texts = {
  introText:
    "StinkyFerret_Production  \npresents:       \n-HBFS-       \nthe_rythm_game",
  creditText:
    "This project is for demonstration purposes,\nit has no commercial intent.\nAll musical rights belong to their respective owners.",
};

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
      setTimeout(() => {
        navigate("/game");
      }, 100);
    }
  }, [isLoading, navigate]);

  return (
    <main className="home-page">
      <div className="responsive-home">
        <div
          className="responsive-home-container"
          style={
            isLoading ? { visibility: "hidden" } : { visibility: "display" }
          }
        >
          <WrittingText text={texts.introText}></WrittingText>
        </div>
        <div className="responsive-home-container">
          <StartButton
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            isPlaying={isPlaying}
          ></StartButton>
        </div>
      </div>
      <div
        className="game-text-container credits"
        style={isLoading ? { visibility: "hidden" } : { visibility: "display" }}
      >
        {texts.creditText}
      </div>
    </main>
  );
};

export default HomePage;

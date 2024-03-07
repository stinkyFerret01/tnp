import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = ({ setAudioCommand, isPlaying }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isPlaying) {
      navigate("/game");
    }
  }, [isPlaying, navigate]);

  //--> starts the game and navigates to gamePage when isPlaying trigged
  const handlePlayButtonClick = () => {
    setAudioCommand({
      actionX: "play",
      timex: 0,
      beatx: 0,
    });
  };

  return (
    <div>
      <button onClick={handlePlayButtonClick}>PLAY</button>
    </div>
  );
};

export default HomePage;

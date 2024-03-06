import { useNavigate } from "react-router-dom";

const HomePage = ({ setAudioCommand }) => {
  const navigate = useNavigate();

  const handlePlayButtonClick = () => {
    setAudioCommand({
      actionX: "play",
      timex: 0,
      beatx: 0,
    });
    navigate("/game");
  };

  return (
    <div>
      <button onClick={handlePlayButtonClick}>GAME</button>
    </div>
  );
};

export default HomePage;

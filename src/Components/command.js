const Command = ({ setPlaying, setAudioCommand }) => {
  const handlePlayButtonClick = () => {
    setPlaying(true);
  };

  const handleSkipButtonClick = () => {
    setAudioCommand({ timex: 49.5, beatx: 409, actionx: "play" });
  };

  const handleStopButtonClick = () => {
    setPlaying(false);
    setAudioCommand({ timex: 0, beatx: 0, actionx: "pause" });
  };
  return (
    <article>
      <button onClick={handleSkipButtonClick}>skip intro</button>
      <button onClick={handleStopButtonClick}>Stop</button>
      <button onClick={handlePlayButtonClick}>Play</button>
    </article>
  );
};
export default Command;

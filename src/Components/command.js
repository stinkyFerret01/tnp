const Command = ({ setPlaying, setAudioCommand }) => {
  const handlePlayButtonClick = () => {
    setAudioCommand({ timex: 0.9, beatx: 9, actionx: "play" });
    setTimeout(() => {
      setPlaying(true);
    }, 200);
  };

  const handleSkipButtonClick = () => {
    setPlaying(false);
    setAudioCommand({ timex: 49.5, beatx: 409, actionx: "play" });
    setTimeout(() => {
      setPlaying(true);
    }, 200);
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

const Command = ({
  beat,
  setPlaying,
  setAudioCommand,
  setScore,
  setMissedShots,
}) => {
  const handlePlayButtonClick = () => {
    setAudioCommand({ timex: 1, beatx: 10, actionx: "play" });
    setTimeout(() => {
      setPlaying(true);
    }, 200);
  };

  const handleSkipButtonClick = () => {
    setPlaying(false);
    setAudioCommand({ timex: 48, beatx: 397, actionx: "play" });
    setTimeout(() => {
      setPlaying(true);
    }, 200);
  };

  const handleStopButtonClick = () => {
    setScore(0);
    setMissedShots([]);
    setPlaying(false);
    setAudioCommand({ timex: 0, beatx: 0, actionx: "pause" });
  };
  return (
    <article>
      {beat < 350 && (
        <button onClick={handleSkipButtonClick}>skip intro</button>
      )}
      <button onClick={handleStopButtonClick}>Stop</button>
      <button onClick={handlePlayButtonClick}>Play</button>
    </article>
  );
};
export default Command;

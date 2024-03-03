const Command = ({
  beat,
  setPlaying,
  setAudioCommand,
  setScore,
  setMissedShots,
}) => {
  const handlePlayButtonClick = () => {
    setAudioCommand({ timex: 0, beatx: 2 });
    setTimeout(() => {
      setPlaying(true);
    }, 200);
  };

  const handleSkipButtonClick = () => {
    setPlaying(false);
    setAudioCommand({ timex: 48, beatx: 397 });
    setTimeout(() => {
      setPlaying(true);
    }, 200);
  };

  const handleStopButtonClick = () => {
    setScore(0);
    setMissedShots([]);
    setPlaying(false);
    setAudioCommand({ timex: 0, beatx: 0 });
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

const Command = ({
  beat,
  setBeat,
  setPlaying,
  setAudioCommand,
  setScore,
  setMissedShots,
}) => {
  const handlePlayButtonClick = () => {
    setBeat(11);
    setTimeout(() => {
      setPlaying(true);
    }, 64);
  };

  // const handleSkipButtonClick = () => {
  //   setPlaying(false);
  //   setAudioCommand({ timex: 48, beatx: 397 });
  //   setTimeout(() => {
  //     setPlaying(true);
  //   }, 200);
  // };

  const handleStopButtonClick = () => {
    setScore(0);
    setMissedShots([]);
    setPlaying(false);
    setBeat(0);
  };

  return (
    <article>
      {/* {beat < 350 && (
        <button onClick={handleSkipButtonClick}>skip intro</button>
      )} */}
      <button onClick={handleStopButtonClick}>Stop</button>
      <button onClick={handlePlayButtonClick}>Play</button>
    </article>
  );
};
export default Command;

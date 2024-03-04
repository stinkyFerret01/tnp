const Command = ({ setAudioCommand, setScore, setMissedShots }) => {
  const handlePlayButtonClick = () => {
    setAudioCommand({
      actionX: "play",
      timex: 0,
      beatx: 0,
    });
  };

  const handleStopButtonClick = () => {
    setAudioCommand({
      actionX: "stop",
      timex: 0,
      beatx: 0,
    });
    setScore(0);
    setMissedShots([]);
  };

  return (
    <article>
      <button onClick={handleStopButtonClick}>STOP</button>
      <button onClick={handlePlayButtonClick}>PLAY</button>
    </article>
  );
};
export default Command;

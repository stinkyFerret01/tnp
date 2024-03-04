import { useEffect } from "react";

const Command = ({
  beat,
  setBeat,
  setPlaying,
  setAudioCommand,
  setScore,
  setMissedShots,
}) => {
  const handlePlayButtonClick = () => {
    // setBeat(20);
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

  useEffect(() => {
    // ---- v2 ----
    if (beat === 500) {
      console.log("second:", Date.now());
    }

    // eslint-disable-next-line
  }, [beat]);

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

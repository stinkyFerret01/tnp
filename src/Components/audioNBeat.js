import { useState, useRef, useEffect } from "react";

const AudioNBeat = ({
  playing,
  setPlaying,
  beat,
  setBeat,
  currentTime,
  setCurrentTime,
  audioCommand,
}) => {
  const audioRef = useRef(null);
  const [intervalId, setIntervalId] = useState(null);

  const handleTimeUpdate = () => {
    if (audioRef.current.currentTime > 0) {
      setCurrentTime(true);
    }
  };

  //---- MUSIC and BEATS INITIALIZERS ----
  useEffect(() => {
    if (playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      setCurrentTime(false);
      audioRef.current.currentTime = 0;
      clearInterval(intervalId);
    }

    // eslint-disable-next-line
  }, [playing]);

  useEffect(() => {
    if (currentTime) {
      let id = null;
      let tempo = 121;
      setTimeout(() => {
        let beatIntervalId = setInterval(() => {
          setBeat((prevBeat) => prevBeat + 1);
        }, tempo);

        id = beatIntervalId;
        setIntervalId(id);

        return () => {
          clearInterval(beatIntervalId);
        };
      }, 2000);
      // }, 880);
    }

    // eslint-disable-next-line
  }, [currentTime]);

  return (
    <audio
      ref={audioRef}
      onTimeUpdate={handleTimeUpdate}
      width="10000"
      className="audioPlayer"
      src="../Audio/HBFSp04.mp3"
      type="audio/mp3"
      controls
      // muted="false"
      loop
      // autoPlay
    />
  );
};

export default AudioNBeat;

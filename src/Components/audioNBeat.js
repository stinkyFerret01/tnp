import { useState, useRef, useEffect } from "react";

const AudioNBeat = ({
  playing,
  setPlaying,
  beat,
  setBeat,
  currentTime,
  setCurrentTime,
  audioCommand,
  setAudioCommand,
}) => {
  const audioRef = useRef(null);
  const [intervalIds, setIntervalIds] = useState([]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  //---- MUSIC and BEATS POSITION SETTERS ----
  useEffect(() => {
    audioRef.current.currentTime = audioCommand.timex;
    setBeat(audioCommand.beatx);
    // eslint-disable-next-line
  }, [audioCommand]);

  //---- MUSIC and BEATS INITIALIZERS ----
  useEffect(() => {
    if (playing) {
      setTimeout(() => {
        audioRef.current.play();

        let ids = [];
        let tempo = 121;

        let beatIntervalId = setInterval(() => {
          setBeat((prevBeat) => prevBeat + 1);
        }, tempo);
        ids.push(beatIntervalId);

        setIntervalIds(ids);
        return () => {
          intervalIds.forEach((id) => clearInterval(id));
        };
      }, 200);
    } else {
      audioRef.current.pause();

      intervalIds.forEach((id) => clearInterval(id));
    }

    // eslint-disable-next-line
  }, [playing]);

  return (
    <audio
      ref={audioRef}
      onTimeUpdate={handleTimeUpdate}
      width="10000"
      className="audioPlayer"
      src="../Audio/HBFSp03.mp3"
      type="audio/mp3"
      controls
      // muted="false"
      loop
      // autoPlay
    />
  );
};

export default AudioNBeat;

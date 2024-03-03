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

  //---- COMMANDS EXECUTER ----
  useEffect(() => {
    const timeDefiner = (timex, beatx, actionx) => {
      if (audioRef.current) {
        audioRef.current.pause();
        setTimeout(() => {
          if (actionx === "play") {
            audioRef.current.play();
          }
          audioRef.current.currentTime = timex;
          setBeat(beatx);
        }, 200);
        if (actionx === "play") {
          audioRef.current.play();
        } else if (actionx === "pause") {
          audioRef.current.pause();
          intervalIds.forEach((id) => clearInterval(id));
        }
      }
    };

    timeDefiner(audioCommand.timex, audioCommand.beatx, audioCommand.actionx);

    // eslint-disable-next-line
  }, [audioCommand]);

  //---- MUSIC and BEATS INITIALIZERS ----
  useEffect(() => {
    if (playing) {
      setTimeout(() => {
        setAudioCommand({ timex: 0.95, beatx: 9, actionx: "play" });

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

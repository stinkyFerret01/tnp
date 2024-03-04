import { useState, useEffect } from "react";

const AudioNBeat = ({
  playing,
  setPlaying,
  isPlaying,
  setIsPlaying,
  beat,
  setBeat,
  currentTime,
  setCurrentTime,
  audioCommand,
}) => {
  // const audioRef = useRef(null);
  const [intervalId, setIntervalId] = useState(null);

  // const handleTimeUpdate = () => {
  //   console.log(audioRef.current.currentTime);
  //   if (audioRef.current.currentTime > 0) {
  //     setCurrentTime(true);
  //   }
  // };

  //---- MUSIC INITIALIZER ----
  // useEffect(() => {
  //   if (playing) {
  //     audioRef.current.play();
  //   } else {
  //     audioRef.current.pause();
  //     setCurrentTime(false);
  //     audioRef.current.currentTime = 0;
  //     clearInterval(intervalId);
  //   }

  //   // eslint-disable-next-line
  // }, [playing]);

  // ---- BEATS INITIALIZER ----
  // useEffect(() => {
  //   if (currentTime) {
  //     let id = null;
  //     let tempo = 121;
  //     setTimeout(() => {
  //       let beatIntervalId = setInterval(() => {
  //         setBeat((prevBeat) => prevBeat + 1);
  //       }, tempo);

  //       id = beatIntervalId;
  //       setIntervalId(id);

  //       return () => {
  //         clearInterval(beatIntervalId);
  //       };
  //     }, 2000);
  //     // }, 880);
  //   }

  //   // eslint-disable-next-line
  // }, [currentTime]);

  //---- TEST ---
  // useEffect(() => {
  //   //---- v2 ----
  //   if (playing) {
  //     let id = null;
  //     let tempo = 121;
  //     setTimeout(() => {
  //       audioRef.current.play();
  //       let beatIntervalId = setInterval(() => {
  //         setBeat((prevBeat) => prevBeat + 1);
  //       }, tempo);

  //       id = beatIntervalId;
  //       setIntervalId(id);

  //       return () => {
  //         clearInterval(beatIntervalId);
  //       };
  //     }, 128);
  //   } else {
  //     audioRef.current.pause();
  //     setCurrentTime(false);
  //     audioRef.current.currentTime = 0;
  //     clearInterval(intervalId);
  //   }

  //   // eslint-disable-next-line
  // }, [playing]);

  // ---- BEATS INITIALIZER ----
  useEffect(() => {
    clearInterval(intervalId);

    if (isPlaying) {
      console.log("isPlayingUseEffect:", Date.now());

      let id = null;
      let tempo = 121;
      setTimeout(() => {
        console.log("initBeatInterval", Date.now());

        let beatIntervalId = setInterval(() => {
          setBeat((prevBeat) => prevBeat + 1);
        }, tempo);

        id = beatIntervalId;
        setIntervalId(id);

        return () => {
          clearInterval(beatIntervalId);
        };
      }, 128);
    } else {
      setBeat(0);
    }

    // eslint-disable-next-line
  }, [isPlaying]);

  useEffect(() => {
    console.log("BEAT", beat, Date.now());
    // if (beat === 27) {
    //   console.log("BEAT20 trigg answer", Date.now());
    // }

    // eslint-disable-next-line
  }, [beat]);

  // return (
  //   <div></div>
  //   // <audio
  //   //   ref={audioRef}
  //   //   onTimeUpdate={handleTimeUpdate}
  //   //   width="10000"
  //   //   className="audioPlayer"
  //   //   // src="../Audio/HBFSp04.mp3"
  //   //   type="audio/mp3"
  //   //   controls
  //   //   // muted="false"
  //   //   loop
  //   //   // autoPlay
  //   // />
  // );
};

export default AudioNBeat;

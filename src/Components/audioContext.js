import React, { useState, useEffect } from "react";

const AudioContext = ({
  audioCommand,
  setIsPlaying,
  setCurrentTime,
  checkCurrentTimeIntervalId,
  setCheckCurrentTimeIntervalId,
}) => {
  const [musicRef, setMusicRef] = useState(null);

  useEffect(() => {
    //---- TOREWORK ---
    clearInterval(checkCurrentTimeIntervalId);
    console.log("COMMAND:", audioCommand);
    if (audioCommand.actionX === "play") {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();

      const loadAudio = async () => {
        const response = await fetch("../Audio/HBFSp04.mp3");
        const audioData = await response.arrayBuffer();

        //---- decoding audioData takes a long time
        const audioBuffer = await audioContext.decodeAudioData(audioData);

        const source = audioContext.createBufferSource();

        source.buffer = audioBuffer;

        source.connect(audioContext.destination);

        //---- EXECUTE start music ----
        source.start(0);

        setMusicRef(source);

        //---- TRIGGER isPlaying ----
        let checkCurrentTimeInterval;

        const checkTime = () => {
          let musicTime = audioContext.currentTime;
          console.log(musicTime);
          setCurrentTime(musicTime);
          if (musicTime > 6) {
            clearInterval(checkCurrentTimeInterval);
          }
        };

        checkCurrentTimeInterval = setInterval(() => {
          checkTime();
        }, 10);

        setCheckCurrentTimeIntervalId(checkCurrentTimeInterval);
      };

      loadAudio();

      return () => {
        audioContext.close();
      };
    } else if (musicRef) {
      musicRef.stop();
      setIsPlaying(false);
    }

    // eslint-disable-next-line
  }, [audioCommand]);

  // -- TOCHECK --
  return <div></div>;
};

export default AudioContext;

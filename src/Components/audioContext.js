import React, { useState, useEffect } from "react";

const AudioContext = ({
  audioCommand,
  setBeat,
  isPlaying,
  setIsPlaying,
  currentTime,
  setCurrentTime,
}) => {
  const [musicRef, setMusicRef] = useState(null);
  // const [audioContext, setAudioContext] = useState(null);

  const [startAudioDate, setStartAudioDate] = useState(0);
  const [startAudioDatePlus, setStartAudioDatePlus] = useState(0);

  const [checkTimeIntervalId, setCheckTimeIntervalId] = useState(null);

  useEffect(() => {
    console.log("CHECKTIMECLEAR:", checkTimeIntervalId);
    clearInterval(checkTimeIntervalId);
    console.log(audioCommand);
    if (audioCommand.actionX === "play") {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();

      const loadAudio = async () => {
        const response = await fetch("../Audio/HBFSp04.mp3");
        const audioData = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(audioData);

        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;

        source.connect(audioContext.destination);
        console.log("1", audioContext.state);

        //---- EXECUTE start music ----
        source.start(0);
        let executeAudioStart = Date.now();
        setStartAudioDate(Date.now());

        setMusicRef(source);

        //---- TRIGGER isPlaying ----
        const checkTime = () => {
          // console.log(s);
          let time = Date.now() - 1900;
          let dif = time - executeAudioStart;
          let musicTime = audioContext.currentTime;
          setCurrentTime(musicTime);

          if (dif >= -2 && dif <= 2) {
            setStartAudioDatePlus(Date.now());
            console.log(dif);
            clearInterval(checkTimeIntervalId);
            setIsPlaying(true);
            setTimeout(() => {
              setBeat(20);
            }, 320);

            return () => {
              audioContext.close();
            };
          }
        };

        const interval = setInterval(() => {
          checkTime();
        }, 1);
        setCheckTimeIntervalId(interval);
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

  useEffect(() => {
    console.log(currentTime);
  }, [currentTime]);

  // -- TOCHECK --
  return (
    <div>
      <button
        onClick={() => {
          for (
            let i = checkTimeIntervalId - 100;
            i < checkTimeIntervalId;
            i++
          ) {
            clearInterval(i);
          }
        }}
      >
        skip
      </button>
      <div style={{ backgroundColor: "blue" }}>
        {<p>StartAudio ------: {startAudioDate}</p>}
      </div>
      <div style={{ backgroundColor: "green" }}>
        {<p>startAudioDatePlus: {startAudioDatePlus}</p>}
      </div>
      {/* <div style={{ backgroundColor: "red" }}>
        {<p>settingBeatDate --: {settingBeatDate}</p>}
      </div> */}
    </div>
  );
};

export default AudioContext;

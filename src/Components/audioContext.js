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
  const [startCurrentTimeMarker, setStartCurrentTimeMarker] = useState(null);
  // const [startCurrentTimeMarker2, setStartCurrentTimeMarker2] = useState(null);

  const [startAudioDate, setStartAudioDate] = useState(null);
  // const [startAudioDatePlus, setStartAudioDatePlus] = useState(null);

  const [checkTimeIntervalId, setCheckTimeIntervalId] = useState(null);

  useEffect(() => {
    //---- TOREWORK ---
    clearInterval(checkTimeIntervalId);
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
        let checkTimeInterval;
        const checkTime = () => {
          let musicTime = audioContext.currentTime;
          setCurrentTime(musicTime);
          if (musicTime > 1.98) {
            console.log(audioContext.currentTime);
            console.log(Date.now());

            clearInterval(checkTimeInterval);

            setStartAudioDate(Date.now());
            setStartCurrentTimeMarker(musicTime);

            setTimeout(() => {
              setIsPlaying(true);
              // setTimeout(() => {
              //   setBeat(16);
              // }, 320);
            }, 100);
          }
        };

        checkTimeInterval = setInterval(() => {
          checkTime();
        }, 1);
        setCheckTimeIntervalId(checkTimeInterval);
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

  // useEffect(() => {
  //   console.log(currentTime);
  // }, [currentTime]);

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
        {<p>startCurrentTimeMarker ------: {startCurrentTimeMarker}</p>}
      </div>
      <div style={{ backgroundColor: "blue" }}>
        {<p>StartAudio ------: {startAudioDate}</p>}
      </div>
      {/* <div style={{ backgroundColor: "blue" }}>
        {<p>startCurrentTimeMarker2 ------: {startCurrentTimeMarker2}</p>}
      </div> */}
      {/* <div style={{ backgroundColor: "green" }}>
        {<p>startAudioDatePlus: {startAudioDatePlus}</p>}
      </div> */}
      {/* <div style={{ backgroundColor: "red" }}>
        {<p>settingBeatDate --: {settingBeatDate}</p>}
      </div> */}
    </div>
  );
};

export default AudioContext;

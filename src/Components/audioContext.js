import React, { useState, useEffect } from "react";

const AudioContext = ({ audioCommand, setBeat, isPlaying, setIsPlaying }) => {
  const [musicRef, setMusicRef] = useState(null);

  const [dateCheckAudio, setDateCheckAudio] = useState(0);
  const [dateCheckStartAudio, setDateCheckStartAudio] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const [checkTimeIntervalId, setCheckTimeIntervalId] = useState(null);

  useEffect(() => {
    // console.log(audioCommand);
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    const loadAudio = async () => {
      const response = await fetch("../Audio/HBFSp04.mp3");
      const audioData = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(audioData);

      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;

      source.connect(audioContext.destination);

      //---- EXECUTE start music ----
      if (audioCommand.actionX === "play") {
        setDateCheckStartAudio(Date.now());
        source.start(0);
        setCurrentTime(audioContext.currentTime || 99999999);
      }
      if (audioCommand.actionX === "stop") {
        clearInterval(checkTimeIntervalId);
        musicRef.stop();
        setTimeout(() => {
          setIsPlaying(false);
        }, 64);
      }

      setMusicRef(source);
      console.log(audioCommand);

      //---- TRIGGER isPlaying ----
      const checkTime = () => {
        //-- TOCHECK --
        // clearInterval(beatIntervalId);
        // const currentTime = audioContext.currentTime;
        // if (currentTime >= 3.05 && currentTime < 3.1) {
        if (audioContext.currentTime >= 3) {
          setDateCheckAudio(Date.now());
          console.log("checkTimeTrigged:", Date.now());
          setIsPlaying(true);
          setTimeout(() => {
            setBeat(26);
          }, 320);

          return () => {
            audioContext.close();
          };
        }
      };

      audioContext.onstatechange = () => {
        console.log(audioContext.state);
        setIsPlaying(!isPlaying);
        setTimeout(() => {
          setBeat(0);
        }, 804);
      };

      // if (audioCommand.actionX === "play" && !isPlaying) {
      //   const initCheckTimeInterval = setInterval(checkTime, 1);
      //   setCheckTimeIntervalId(initCheckTimeInterval);
      // }
    };

    loadAudio();

    return () => {
      audioContext.close();
    };

    // eslint-disable-next-line
  }, [setBeat, audioCommand]);

  //-- TOCHECK --
  return (
    <div>
      <div style={{ backgroundColor: "blue" }}>
        {<p>StartAudio: {dateCheckStartAudio}</p>}
      </div>
      <div style={{ backgroundColor: "green" }}>
        {<p>currentTime: {currentTime}</p>}
      </div>
      <div style={{ backgroundColor: "red" }}>
        {<p>Audio: {dateCheckAudio}</p>}
      </div>
    </div>
  );
};

export default AudioContext;

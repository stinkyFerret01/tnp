import React, { useState, useEffect } from "react";

const AudioContext = ({ audioCommand, setBeat, setIsPlaying }) => {
  const [musicRef, setMusicRef] = useState(null);

  const [dateCheckAudio, setDateCheckAudio] = useState(0);
  const [dateCheckStartAudio, setDateCheckStartAudio] = useState(0);

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
        const currentTime = audioContext.currentTime;
        // if (currentTime >= 3.05 && currentTime < 3.1) {
        if (currentTime >= 10.05 && currentTime < 10.1) {
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
      if (audioCommand.actionX === "play") {
        const initCheckTimeInterval = setInterval(checkTime, 1);
        setCheckTimeIntervalId(initCheckTimeInterval);
      }
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
        {dateCheckStartAudio && <p>StartAudio: {dateCheckStartAudio}</p>}
      </div>
      <div style={{ backgroundColor: "red" }}>
        {dateCheckAudio && <p>Audio: {dateCheckAudio}</p>}
      </div>
    </div>
  );
};

export default AudioContext;

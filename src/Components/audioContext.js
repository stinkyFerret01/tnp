import React, { useState, useEffect } from "react";

const AudioContext = ({ audioCommand, setBeat, isPlaying, setIsPlaying }) => {
  const [audioContext, setAudioContext] = useState(null);
  const [audioSource, setAudioSource] = useState(null);

  const [musicRef, setMusicRef] = useState(null);

  const [startAudioDate, setStartAudioDate] = useState(0);
  // const [MusicStartedDate, setMusicStartedDate] = useState(0);
  // const [settingBeatDate, setSettingBeatDate] = useState(0);

  const [checkTimeIntervalId, setCheckTimeIntervalId] = useState(null);

  // useEffect(() => {
  //   const context = new (window.AudioContext || window.webkitAudioContext)();
  //   setAudioContext(context);

  //   return () => {
  //     context.close(); // Ferme le contexte audio lors du démontage du composant
  //   };
  // }, []);

  // const loadAudio = async () => {
  //   const response = await fetch("../Audio/HBFSp04.mp3");
  //   const audioData = await response.arrayBuffer();
  //   const audioBuffer = await audioContext.decodeAudioData(audioData);

  //   const source = audioContext.createBufferSource();
  //   source.buffer = audioBuffer;
  //   source.connect(audioContext.destination);

  //   setAudioSource(source);
  // };

  // const handlePlay = () => {
  //   if (audioContext && audioSource) {
  //     const newSource = audioContext.createBufferSource();
  //     newSource.buffer = audioSource.buffer;
  //     newSource.connect(audioContext.destination);
  //     setAudioSource(newSource);
  //     setIsPlaying(true);

  //     newSource.start(0);
  //   } else {
  //     console.error("AudioContext or AudioSource is not ready.");
  //   }
  // };

  // const handleStop = () => {
  //   if (audioSource && audioSource.context.state === "running") {
  //     audioSource.stop();
  //     setIsPlaying(false);
  //   }
  // };

  // useEffect(() => {
  //   clearInterval(checkTimeIntervalId);
  //   if (!audioContext) return;
  //   if (audioCommand.actionX === "play") {
  //     const interval = setInterval(() => {
  //       const currentTime = audioContext.currentTime;
  //       console.log(currentTime);
  //       if (currentTime > 3) {
  //         setIsPlaying(true);
  //         setTimeout(() => {
  //           setBeat(10);
  //         }, 880);
  //       }
  //     }, 1);
  //     setCheckTimeIntervalId(interval);
  //     return () => clearInterval(interval);
  //   }

  //   // return () => clearInterval(interval);
  // }, [audioCommand, audioContext]);

  useEffect(() => {
    clearInterval(checkTimeIntervalId);
    // console.log(audioCommand);
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
          let time = Date.now();
          let dif = time - 2000 - executeAudioStart;

          if (dif >= -2 && dif <= 2) {
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

          // const currentTime = audioContext.currentTime;
          // console.log(currentTime);
          // if (currentTime > 3) {
          //   setIsPlaying(true);
          //   setTimeout(() => {
          //     setBeat(10);
          //   }, 880);
          // }
        }, 1);
        setCheckTimeIntervalId(interval);

        audioContext.onstatechange = () => {
          console.log(audioContext.state);

          // setIsPlaying(!isPlaying);
          // setTimeout(() => {
          //   setSettingBeatDate(Date.now());
          //   setBeat(2);
          // }, 804);
        };
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
  return (
    <div>
      <div style={{ backgroundColor: "blue" }}>
        {<p>StartAudio ------: {startAudioDate}</p>}
      </div>
      {/* <div style={{ backgroundColor: "green" }}>
        {<p>MusicStartedDate: {MusicStartedDate}</p>}
      </div>
      <div style={{ backgroundColor: "red" }}>
        {<p>settingBeatDate --: {settingBeatDate}</p>}
      </div> */}
    </div>
  );
};

export default AudioContext;

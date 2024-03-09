import { useState, useEffect } from "react";

const AudioContext = ({
  audioCommand,
  setIsPlaying,
  setOutputLatency,
  setAudioContextState,
  setBeat,
}) => {
  //==> stores the musicContext to make it reachable for the code
  const [musicRef, setMusicRef] = useState(null);

  //==> stores the intervall that checks the context for the moment the music time is running
  const [checkCurrentTimeIntervalId, setCheckCurrentTimeIntervalId] =
    useState(null);

  useEffect(() => {
    clearInterval(checkCurrentTimeIntervalId);
    console.log("COMMAND:", audioCommand);
    if (audioCommand.actionX === "play" || audioCommand.actionX === "skip") {
      let loadLatencyMarker1 = Date.now();
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

        //---- setting MusicRef ----
        setMusicRef(source);

        //---- EXECUTE start music ----
        let contextOutputLatency = Math.floor(
          source.context.outputLatency * 1000
        );
        console.log("contextOutputLatency", contextOutputLatency);

        if (audioCommand.actionX === "play") {
          source.start();
        } else {
          let loadLatencyMarker2 = Date.now();
          let loadLatency = (loadLatencyMarker2 - loadLatencyMarker1) / 1000;
          source.start(
            0,
            audioCommand.timex + loadLatency + contextOutputLatency / 1000
          );
        }

        //--> (control purpose) ----
        setAudioContextState(audioContext.state);

        //---- TRIGGER isPlaying ----
        let checkCurrentTimeInterval;

        if (audioCommand.actionX === "play") {
          const checkTime = () => {
            let musicTime = audioContext.currentTime;

            if (musicTime > 0) {
              setOutputLatency(contextOutputLatency); //---- (control purpose) ----
              if (Number.isNaN(contextOutputLatency)) {
                contextOutputLatency = 40;
              }
              setTimeout(() => {
                setIsPlaying(true);
                clearInterval(checkCurrentTimeInterval);
              }, contextOutputLatency);
            }
          };

          checkCurrentTimeInterval = setInterval(() => {
            checkTime();
          }, 10);
          setCheckCurrentTimeIntervalId(checkCurrentTimeInterval);
        }
      };

      loadAudio();

      return () => {
        audioContext.close();
      };
    } else if (musicRef && audioCommand.actionX === "stop") {
      musicRef.stop();
      setIsPlaying(false);
    }

    // eslint-disable-next-line
  }, [audioCommand]);
};

export default AudioContext;

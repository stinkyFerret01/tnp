import { useState, useEffect } from "react";

const AudioContext = ({ audioCommand, setIsPlaying }) => {
  //==> stores the musicContext to make it reachable for the code
  const [musicRef, setMusicRef] = useState(null);

  //==> stores the intervall that checks the context for the moment the music time is running
  const [checkCurrentTimeIntervalId, setCheckCurrentTimeIntervalId] =
    useState(null);

  //==> stores values to display on devices whithout navigator inspector (test purpose)
  // const [outputLatency, setOuputLatency] = useState(null);

  useEffect(() => {
    clearInterval(checkCurrentTimeIntervalId);
    // console.log("COMMAND:", audioCommand);
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
        source.start(0, 0);

        //---- setting MusicRef ----
        setMusicRef(source);

        //---- TRIGGER isPlaying ----
        let checkCurrentTimeInterval;

        const checkTime = () => {
          let musicTime = audioContext.currentTime;
          let outputLatency = Math.floor(source.context.outputLatency * 1000);

          if (musicTime > 0) {
            // setOuputLatency(outputLatency); //---- (test purpose) ----)
            if (Number.isNaN(outputLatency)) {
              outputLatency = 40;
            }
            setTimeout(() => {
              setIsPlaying(true);
              clearInterval(checkCurrentTimeInterval);
            }, outputLatency);
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
    } else if (musicRef && audioCommand.actionX === "stop") {
      // } else if (musicRef) {
      musicRef.stop();
      setTimeout(() => {
        setIsPlaying(false);
      }, 100);
    }

    // eslint-disable-next-line
  }, [audioCommand]);

  // ---- (test purpose) ----
  // return (
  //   <div>
  //     <div style={{ backgroundColor: "green" }}>
  //       <p>outPut latency: {outputLatency}</p>
  //     </div>
  //   </div>
  // );
};

export default AudioContext;

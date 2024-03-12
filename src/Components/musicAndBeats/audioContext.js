import { useState, useEffect } from "react";

const AudioContext = ({
  audioCommand,
  setIsPlaying,
  setIsLoading,
  setOutputLatency,
}) => {
  //==> stores the musicContext to make it reachable for the code
  const [musicRef, setMusicRef] = useState(null);

  //==> stores the intervall that checks the context for the moment the music time is running
  const [checkCurrentTimeIntervalId, setCheckCurrentTimeIntervalId] =
    useState(null);

  useEffect(() => {
    clearInterval(checkCurrentTimeIntervalId);
    // console.log("COMMAND:", audioCommand);
    if (audioCommand.actionX === "play" || audioCommand.actionX === "skip") {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();

      //--> measure marker (load( time))
      let loadLatencyMarker1 = Date.now();

      //--> starts audio process
      const loadAudio = async () => {
        //--> sets audio context
        const response = await fetch("../Audio/HBFSp04.mp3");
        setIsLoading(20);
        const audioData = await response.arrayBuffer();
        setIsLoading(25);
        const audioBuffer = await audioContext.decodeAudioData(audioData);
        setIsLoading(60);

        const source = audioContext.createBufferSource();

        source.buffer = audioBuffer;

        source.connect(audioContext.destination);

        //--> sets MusicRef
        setMusicRef(source);

        //--> calculates and sets outputLatency
        let contextOutputLatency = Math.floor(
          source.context.outputLatency * 1000
        );
        setOutputLatency(contextOutputLatency); //---- (control purpose) ----
        if (Number.isNaN(contextOutputLatency)) {
          contextOutputLatency = 40;
        }

        //--> executes start music ----
        setIsLoading(96);
        if (audioCommand.actionX === "play") {
          source.start();
        } else {
          //--> measure marker (load( time))
          let loadLatencyMarker2 = Date.now();

          //calculates load() time to synchronise the beatInitialiser and starts
          let loadLatency = (loadLatencyMarker2 - loadLatencyMarker1) / 1000;
          source.start(
            0,
            audioCommand.timex + loadLatency + contextOutputLatency / 1000
          );
          setIsLoading(100);
        }

        //-- checks if audio is ready to trigg the BeatInitialiser
        let checkCurrentTimeInterval;

        if (audioCommand.actionX === "play") {
          const checkTime = () => {
            let musicTime = audioContext.currentTime;

            if (musicTime > 0) {
              setTimeout(() => {
                setIsPlaying(true);
                setTimeout(() => {
                  setIsLoading(100);
                }, 100);
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
      setIsLoading(0);
    }

    // eslint-disable-next-line
  }, [audioCommand]);
};

export default AudioContext;

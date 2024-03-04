import React, { useState, useEffect } from "react";

const AudioContext = ({ setBeat, isPlaying, setIsPlaying }) => {
  const [musicRef, setMusicRef] = useState(null);
  const [command, setCommand] = useState(null);

  // const [beatIntervalId, setBeatIntervalId] = useState(null);
  const [checkTimeIntervalId, setCheckTimeIntervalId] = useState(null);

  useEffect(() => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    const loadAudio = async () => {
      const response = await fetch("../Audio/HBFSp04.mp3");
      const audioData = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(audioData);

      // Créez une source audio
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;

      // Connectez la source audio au contexte audio
      source.connect(audioContext.destination);

      // Démarrer la lecture de la musique
      if (command === "play") {
        source.start(0);
      }

      setMusicRef(source);

      // Exécutez votre logique d'événement lorsque la musique atteint 10 secondes
      const checkTime = () => {
        // clearInterval(beatIntervalId);
        const currentTime = audioContext.currentTime;
        if (currentTime >= 3.05 && currentTime < 3.06) {
          console.log("checkTimeTrigged:", Date.now());
          setIsPlaying(true);
          setTimeout(() => {
            setBeat(27);
          }, 320);

          return () => {
            audioContext.close();
          };
        }
      };

      if (command === "play") {
        const initCheckTimeInterval = setInterval(checkTime, 1);
        setCheckTimeIntervalId(initCheckTimeInterval);
      }
    };

    loadAudio();

    return () => {
      audioContext.close();
    };

    // eslint-disable-next-line
  }, [setBeat, command]);
  useEffect(() => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    const loadAudio = async () => {
      const response = await fetch("../Audio/HBFSp04.mp3");
      const audioData = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(audioData);

      // Créez une source audio
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;

      // Connectez la source audio au contexte audio
      source.connect(audioContext.destination);

      // Démarrer la lecture de la musique
      if (command === "play") {
        source.start(0);
      }

      setMusicRef(source);

      // Exécutez votre logique d'événement lorsque la musique atteint 10 secondes
      const checkTime = () => {
        // clearInterval(beatIntervalId);
        const currentTime = audioContext.currentTime;
        if (currentTime >= 3.05 && currentTime < 3.06) {
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

      if (command === "play") {
        const initCheckTimeInterval = setInterval(checkTime, 1);
        setCheckTimeIntervalId(initCheckTimeInterval);
      }
    };

    if (command === null) {
      loadAudio();
    }

    return () => {
      audioContext.close();
    };

    // eslint-disable-next-line
  }, [setBeat, command]);

  return (
    <div>
      <button
        onClick={() => {
          musicRef.stop();
          clearInterval(checkTimeIntervalId);
          setCommand("stop");
          setTimeout(() => {
            setIsPlaying(false);
          }, 128);
        }}
      >
        STTTTTOP
      </button>
      <button
        onClick={() => {
          setCommand("play");
        }}
      >
        play
      </button>
    </div>
  );
};

export default AudioContext;

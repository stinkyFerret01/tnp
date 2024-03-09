import { useState, useEffect } from "react";

const BeatDisplayer = ({ beat }) => {
  //--> sets the beat to display
  const [beatDisplayed, setBeatDisplayed] = useState(null);
  const [beatOpacity, setBeatOpacity] = useState("1");

  const toggleBeatOpacity = () => {
    if (beatOpacity === "1") {
      setBeatOpacity("0.5");
    } else {
      setBeatOpacity("1");
    }
  };

  const beatBlinker = () => {
    toggleBeatOpacity();
    setTimeout(() => {
      toggleBeatOpacity();
    }, 60);
  };

  //-->sets a displayable beat easy to read for the Player
  useEffect(() => {
    let newBeat = (beat - 2 - ((beat - 2) % 4)) / 4 - 107;
    setBeatDisplayed(newBeat);
    if (newBeat > -10 && newBeat < 0) {
      beatBlinker();
    }

    // eslint-disable-next-line
  }, [beat]);

  return (
    <div className="game-element-container gec-beat">
      <p style={{ opacity: beatOpacity }}>{beatDisplayed}</p>
    </div>
  );
};

export default BeatDisplayer;

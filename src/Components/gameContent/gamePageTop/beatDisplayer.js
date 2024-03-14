import { useState, useEffect } from "react";

import hsbfGameData from "../../../Data/hbfsGameData";
const tempo = hsbfGameData.tempo;

const BeatDisplayer = ({ beat }) => {
  //--> sets the beat to display
  const [beatDisplayed, setBeatDisplayed] = useState(null);
  const [beatOpacity, setBeatOpacity] = useState("1");

  //--> blinks the beat displayed when approaching 0
  const beatBlinker = () => {
    setBeatOpacity("0.5");
    setTimeout(() => {
      setBeatOpacity("1");
    }, tempo * 2);
  };

  //--> sets a displayable beat easy to read for the Player
  useEffect(() => {
    let newBeat = (beat - (beat % 4)) / 4 - 107;
    if (newBeat <= -106) {
      setBeatDisplayed("null");
    } else {
      setBeatDisplayed(newBeat);
    }
    if (newBeat > -10 && newBeat < 0 && (beat - 2) % 4 === 0) {
      beatBlinker();
    }

    // eslint-disable-next-line
  }, [beat]);

  return (
    <div className="game-element-container gec-num">
      <p style={{ opacity: beatOpacity }}>{beatDisplayed}</p>
    </div>
  );
};

export default BeatDisplayer;

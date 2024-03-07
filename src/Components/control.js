import { useState, useEffect } from "react";

import dateFormatter from "../utils/dateFormatter";

//---- (control purpose -- LOG ONLY) ----
import timejumpControlerLog from "../utils/logs/timeJumpControlerLog";

//==> you can set the control beat difference parameter here
const controlBeatDifData = {
  from: 50,
  range: 512,
};

const Control = ({
  isPlaying,
  outputLatency,
  beat,
  timeJumps,
  setTimeJumps,
}) => {
  //==> displays or hide the control panel
  const [isActive, setIsActive] = useState(false);

  const toggleControlPanel = () => {
    setIsActive(!isActive);
  };

  //---- BEATDIF CHECKER (control purpose) ----
  //==> stores the beatDif values to display on devices without navigator inspector
  const [beatDifMarker1, setBeatDifMarker1] = useState(null);
  const [beatDif, setBeatDif] = useState(null);

  //---- TIMEJUMPS CHECKER (wip) ----
  //==> stores the date to be compared with a new one some short time later
  const [dateMarker, setDateMarker] = useState(0);

  //==> sets the timeJumps values (wip)
  const addTimeJump = (dif) => {
    const newTimeJumps = [
      ...timeJumps,
      { when: dateFormatter(), howMuchMs: dif },
    ];
    setTimeJumps(newTimeJumps);

    //---- (control purpose -- LOG ONLY) ----
    timejumpControlerLog(dif);
  };

  //---- TIMEJUMPS CHECKER (wip) ----
  //--> checks date.now every Number ms to detect time jumps on the reference
  useEffect(() => {
    if (isPlaying) {
      let newDateMarker = Date.now();
      let dif = newDateMarker - (dateMarker + 50);
      if (dateMarker > 0 && (dif > 30 || dif < -30)) {
        addTimeJump(dif);
      }
      setTimeout(() => {
        setDateMarker(newDateMarker);
      }, 50);
    } else {
      setTimeJumps([]);
      setDateMarker(0);
    }

    // eslint-disable-next-line
  }, [dateMarker, isPlaying]);

  //---- BEATDIF CHECKER (control purpose) ----
  //--> measures the time interval between two defined beats
  useEffect(() => {
    if (beat === controlBeatDifData.from) {
      let newBeatDifMarker = Date.now();
      setBeatDifMarker1(newBeatDifMarker);
    } else if (beat === controlBeatDifData.from + controlBeatDifData.range) {
      let newBeatDifMarker = Date.now();
      setBeatDif(newBeatDifMarker - beatDifMarker1);
    }
  }, [beat, beatDifMarker1]);

  return isActive ? (
    <div className="control-container">
      <div className="output-latency">Output Latency: {outputLatency}</div>
      <div className="beat-dif-container">
        <div className="beat-dif-element">
          From beat: {controlBeatDifData.from}
        </div>
        <div className="beat-dif-element">
          To beat: {controlBeatDifData.from + controlBeatDifData.range}
        </div>
        <div className="beat-dif-element">
          Measured: {beatDif ? beatDif : "measuring..."}
        </div>
        <div className="beat-dif-element">
          Expected: {controlBeatDifData.range * 121}
        </div>
        <div className="beat-dif-element">Beat: {beat}</div>
        <button onClick={toggleControlPanel}>close control</button>
      </div>
      {timeJumps.length > 0 && (
        <div className="time-jumps-container">
          {timeJumps.map((jump, index) => {
            return (
              <div key={index} className="time-jump">
                at: {jump.when}
                jump: {jump.howMuchMs}
              </div>
            );
          })}
        </div>
      )}
    </div>
  ) : (
    <button className="toggle-control-button" onClick={toggleControlPanel}>
      control
    </button>
  );
};

export default Control;

import { useState, useEffect } from "react";

import dateFormatter from "../../utils/dateFormatter";

//---- (control purpose -- LOG ONLY) ----
import timejumpControlerLog from "../../utils/logs/timeJumpControlerLog";

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
  negDelays,
  setNegDelays,
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

  //---- TIMEJUMPS CHECKER (control purpose) ----
  //==> stores the date to be compared with a new one some short time later
  const [dateMarker, setDateMarker] = useState(0);

  //--> checks a regularly calculated delay based on 2 date.now() values
  const timeJumpsControler = (dif) => {
    if (dateMarker > 0 && (dif > 30 || dif < -30)) {
      const newTimeJumps = [
        ...timeJumps,
        { when: dateFormatter(), howMuchMs: dif },
      ];
      setTimeJumps(newTimeJumps);
      timejumpControlerLog(dif);
    }
  };

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

  //---- TIMEJUMPS CHECKER (control purpose) ----
  //--> checks date.now every Number ms to detect time jumps on the reference
  useEffect(() => {
    if (isPlaying) {
      let newDateMarker = Date.now();
      let dif = newDateMarker - (dateMarker + 50);
      timeJumpsControler(dif);
      setTimeout(() => {
        setDateMarker(newDateMarker);
      }, 50);
    } else {
      setTimeJumps([]);
      setNegDelays([]);
      setDateMarker(0);
    }

    // eslint-disable-next-line
  }, [dateMarker, isPlaying]);

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
                at: {jump.when} || jump: {jump.howMuchMs}
              </div>
            );
          })}
        </div>
      )}
      {negDelays.length > 0 && (
        <div className="time-jumps-container">
          {negDelays.map((delay, index) => {
            return (
              <div key={index} className="time-jump">
                at: {delay.when} || negative delay: {delay.howMuchMs}
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

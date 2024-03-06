import { useState, useEffect } from "react";

const dateFormatter = () => {
  const timestamp = Date.now();
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  return formattedTime;
};

const BeatInitialiser = ({ isPlaying, beat, setBeat }) => {
  //==> stores the date from when the beats will be synchronised
  const [initBeatDate, setInitBeatDate] = useState(0);

  //==> stores values to display on devices whithout navigator inspector (test purpose)
  // const [controlBeat1, setControlBeat1] = useState(null);
  // const [controlBeat2, setControlBeat2] = useState(null);
  // const [beatDif, setBeatDif] = useState(null);

  //---- TIMEJUMPS CHECKER (wip) ----
  const [timeJumps, setTimeJumps] = useState([]);
  const [dateMarker, setDateMarker] = useState(0);
  //==> sets the timeJumps values (wip)
  const addTimeJump = (delay) => {
    const newTimeJumps = [
      ...timeJumps,
      { when: dateFormatter(), howMuchMs: delay },
    ];
    setTimeJumps(newTimeJumps);
  };

  //---- BEAT REPEATER ----
  useEffect(() => {
    //--> calculates delay before next beat
    let mult = beat + 1;
    let target = initBeatDate + 121 * mult;
    let beatDate = Date.now();
    let delay = target - beatDate;
    if (delay < 0 && delay > -10000) {
      console.log("PROBLEM", dateFormatter());
      console.log("next beat delay -(", delay, "ms )- should not be negative");
    }

    //--> sets next beat
    if (initBeatDate > 0 && beat < 1879) {
      setTimeout(() => {
        setBeat((prevBeat) => prevBeat + 1);
      }, delay);
    } else if (initBeatDate === 0 || beat === 1879) {
      setTimeJumps([]);
      setBeat(0);
    }

    //---- BEATDIF CHECKER (test purpose) ----
    // if (beat === 120) {
    //   setControlBeat1(beatDate);
    // } else if (beat === 1120) {
    //   setControlBeat2(beatDate);
    //   setBeatDif(beatDate - controlBeat1);
    // }

    // eslint-disable-next-line
  }, [initBeatDate, beat]);

  // ---- BEAT INITIALISER ----
  useEffect(() => {
    if (isPlaying) {
      //--> stores beat initialization date (triggs BEAT INITIALISER useEffect loop)
      setInitBeatDate(Date.now());
    } else {
      //--> resets beats values (stops BEAT INITIALISER useEffect loop)
      setInitBeatDate(0);
    }
  }, [isPlaying, setBeat, setInitBeatDate]);

  //---- TIMEJUMPS CHECKER (wip) ----
  useEffect(() => {
    let newDateMarker = Date.now();
    let dif = newDateMarker - (dateMarker + 50);
    if (dateMarker > 0 && (dif > 30 || dif < -30)) {
      addTimeJump(dif);
      console.log("PROBLEM", dateFormatter());
      console.log("reference time has jumped a -(", dif, "ms )- timejump");
    }
    setTimeout(() => {
      setDateMarker(newDateMarker);
    }, 50);

    // eslint-disable-next-line
  }, [dateMarker]);

  //---- (test purpose) ----
  useEffect(() => {
    if (timeJumps.length > 0) console.log("time jumps :", timeJumps);
  }, [timeJumps]);

  return (
    <div>
      {timeJumps.length > 1 && (
        <div style={{ backgroundColor: "yellow" }}>
          TIMEJUMP PROBLEM (more than one timejump)
        </div>
      )}
      {/* <div style={{ backgroundColor: "yellow" }}>
        <p>initBeatDate -----: {initBeatDate}</p>
      </div> */}
      {/* <div style={{ backgroundColor: "orange" }}>
        <p>currentTimeMarker -----: {currentTimeMarker}</p>
      </div> */}
      {/* <div style={{ backgroundColor: "pink" }}>
        <p>controlBeat1 -----: {controlBeat1}</p>
      </div> */}
      {/* <div style={{ backgroundColor: "pink" }}>
        <p>controlBeat2 -----: {controlBeat2}</p>
      </div> */}
      {/* <div style={{ backgroundColor: "pink" }}>
        <p>beatDif -----: {beatDif}</p>
      </div> */}
    </div>
  );
};

export default BeatInitialiser;

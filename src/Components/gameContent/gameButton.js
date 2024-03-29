//==> Game button est l'element principal du jeux pour le Player
//==> il s'invoque avec une prop "word" qui défini sa valeur
import { useEffect, useState } from "react";

//==> data
import hsbfGameData from "../../Data/hbfsGameData";

//==> utils
import timeoutedSetter from "../../utils/timeoutedSetter";

const GameButton = ({
  label,
  beat,
  goodWords,
  setScore,
  setMissedTargets,
  missedShots,
  setMissedShots,
  buttonActTimeoutIds,
  setButtonActTimeoutIds,
}) => {
  //==> stores the button status
  const [buttonStatus, setButtonStatus] = useState("button-off");

  //==> block Player's click when true (anti-spam)
  const [targetBlocker, setTargetBlocker] = useState(false);
  // const doubleClickBCancel = useRef(false);

  //==> stores the time out from "on" to "miss"
  const [turnOffTimeoutId, setTurnOffTimeoutId] = useState(null);

  const tempo = hsbfGameData.tempo;

  //==> stops the activation if Player clicked very close before it was time
  const clearTimeoutByLabel = () => {
    const index = buttonActTimeoutIds.findIndex((item) => item.label === label);

    if (index !== -1) {
      const element = buttonActTimeoutIds[index];

      if (Date.now() - element.date > 0) {
        clearTimeout(element.timeoutId);

        const updatedTimeOuts = [
          ...buttonActTimeoutIds.slice(0, index),
          ...buttonActTimeoutIds.slice(index + 1),
        ];

        setButtonActTimeoutIds(updatedTimeOuts);
      }
    }
  };

  //--> starts an activation delay when the label is detected in [goodWords]
  const buttonActivater = () => {
    // let delayApproach = tempo * 37;
    let delayApproach = tempo * 36.8;

    let delayActive = tempo * 3.5;
    const newTimeout = { date: Date.now() + tempo * 36, label: label };
    const buttonActivationTimeOut = setTimeout(() => {
      setButtonStatus("button-on");
      const turnTargetOff = setTimeout(() => {
        setButtonStatus("button-off");
        if (beat - hsbfGameData.beatMod > -10) {
          setMissedTargets((prevMissedTargets) => prevMissedTargets + 1);
        }
      }, delayActive);
      setTurnOffTimeoutId(turnTargetOff);
    }, delayApproach);
    newTimeout.timeoutId = buttonActivationTimeOut;
    setButtonActTimeoutIds((prevIdsArray) => [...prevIdsArray, newTimeout]);
  };

  //--> cuts the turnOffTimeout
  const missCanceler = () => {
    if (turnOffTimeoutId) {
      clearTimeout(turnOffTimeoutId);
    }
  };

  //--> calculates and register scores for a click (define gameButton status for animation)
  const shootResultDefiner = () => {
    if (buttonStatus === "button-on" && !targetBlocker) {
      //---- target hit ----
      // laserPlayer();
      if (beat - hsbfGameData.beatMod > -10) {
        setScore((prevScore) => prevScore + 1);
      }
      missCanceler();
      clearTimeoutByLabel();

      timeoutedSetter(["button-off", "button-hit"], setButtonStatus, tempo * 2);
    } else {
      //---- shot missed ----
      // buzzPlayer();
      if (beat - hsbfGameData.beatMod > -10) {
        if (missedShots.length < 17) {
          setMissedShots((prevMissedShots) => [...prevMissedShots, Date.now()]);
        }
      }

      clearTimeoutByLabel();

      timeoutedSetter(
        ["button-off", "button-miss"],
        setButtonStatus,
        tempo * 2
      );
    }
  };

  //--> calculates results when any gameButton is clicked at any time
  const handleShoot = () => {
    timeoutedSetter([false, true], setTargetBlocker, tempo);
    shootResultDefiner();
  };

  //---- onTouch test (wip) ----
  // const handleTouch = () => {
  //   doubleClickBCancel.current = true;
  //   handleShoot();
  // };
  // const handleShoot = () => {
  //   if (doubleClickBCancel.current) return;
  //   timeoutedSetter([false, true], setTargetBlocker, tempo);
  //   shootResultDefiner();
  // };
  // const handleClick = () => {
  //   handleShoot();
  // };
  // const stopHandleShoot = () => {
  //   doubleClickBCancel.current = false;
  // };

  //--> triggs the activation off the gameButton
  useEffect(() => {
    if (goodWords && goodWords.includes(label)) {
      buttonActivater();
    }

    // eslint-disable-next-line
  }, [label, goodWords]);

  return (
    <button
      className={`game-button ${buttonStatus}`}
      // onTouchStart={handleShoot}
      // onTouchEnd={stopHandleShoot}
      onClick={handleShoot}
    >
      {label.toUpperCase()}
    </button>
  );
};

export default GameButton;

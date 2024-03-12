//==> Game button est l'element principal du jeux pour le Player
//==> il s'invoque avec une prop "word" qui défini sa valeur
import { useEffect, useState, useRef } from "react";

//==> data
import hsbfGameData from "../../Data/hbfsGameData";
import buzz from "../../Data/sounds/buzz.mp3";
import laser from "../../Data/sounds/laser.mp3";
import laser2 from "../../Data/sounds/laser2.mp3";
import laser3 from "../../Data/sounds/laser3.mp3";
import laser4 from "../../Data/sounds/laser4.mp3";

//==> utils
import timeoutedSetter from "../../utils/timeoutedSetter";

const lasers = [laser, laser2, laser3, laser4];

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
  const doubleClickBCancel = useRef(false);

  //==> stores the time out from "on" to "miss"
  const [turnOffTimeoutId, setTurnOffTimeoutId] = useState(null);

  const tempo = hsbfGameData.tempo;

  const buzzPlayer = () => {
    const audio = new Audio(buzz);
    audio.play();
  };

  const laserPlayer = () => {
    const randomNumber = Math.floor(Math.random() * 4);
    const audio = new Audio(lasers[randomNumber]);
    audio.play();
  };

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
    let delayApproach = tempo * 37;
    let delayActive = tempo * 3;
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
      laserPlayer();
      if (beat - hsbfGameData.beatMod > -10) {
        setScore((prevScore) => prevScore + 1);
      }
      missCanceler();
      clearTimeoutByLabel();

      timeoutedSetter(["button-off", "button-hit"], setButtonStatus, tempo * 2);
    } else {
      //---- shot missed ----
      buzzPlayer();
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
  // const handleShoot = () => {
  //   timeoutedSetter([false, true], setTargetBlocker, tempo);
  //   shootResultDefiner();
  // };

  const handleShoot = () => {
    if (doubleClickBCancel.current) return;
    timeoutedSetter([false, true], setTargetBlocker, tempo);
    shootResultDefiner();
    doubleClickBCancel.current = true;

    const timer = setTimeout(() => {
      doubleClickBCancel.current = false;
    }, tempo);
    return () => clearTimeout(timer);
  };

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
      onTouchStart={handleShoot}
      onClick={handleShoot}
    >
      {label.toUpperCase()}
    </button>
  );
};

export default GameButton;

//==> Game button est l'element principal du jeux pour le Player
//==> il s'invoque avec une prop "word" qui défini sa valeur
import { useEffect, useState } from "react";

import hsbfGameData from "../../beatData/hbfsGameData";

const GameButton = ({
  label,
  beat,
  goodWords,
  setScore,
  setMissedTargets,
  missedShots,
  setMissedShots,
  buttonActivationTimeoutIds,
  setButtonActivationTimeOutIds,
}) => {
  //==> stores the button status
  const [buttonStatus, setButtonStatus] = useState("button-off");

  //==> block Player's click when true (anti-spam)
  const [targetBlocker, setTargetBlocker] = useState(false);

  //==> stores the time out from "on" to "miss"
  const [turnOffTimeoutId, setTurnOffTimeoutId] = useState(null);

  const clearTimeoutByLabel = () => {
    const index = buttonActivationTimeoutIds.findIndex(
      (item) => item.label === label
    );

    if (index !== -1) {
      const element = buttonActivationTimeoutIds[index];

      if (Date.now() - element.date > 0) {
        clearTimeout(element.timeoutId);

        const updatedTimeOuts = [
          ...buttonActivationTimeoutIds.slice(0, index),
          ...buttonActivationTimeoutIds.slice(index + 1),
        ];

        setButtonActivationTimeOutIds(updatedTimeOuts);
      }
    }
  };

  //--> starts an activation delay when the label is detected in [goodWords]
  const buttonActivater = () => {
    let delayApproach = 4520;
    let delayActive = 400;
    const newTimeout = { date: Date.now() + 4400, label: label };
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
    setButtonActivationTimeOutIds((prevIdsArray) => [
      ...prevIdsArray,
      newTimeout,
    ]);
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
      if (beat - hsbfGameData.beatMod > -10) {
        setScore((prevScore) => prevScore + 1);
      }
      missCanceler();
      clearTimeoutByLabel();

      setButtonStatus("button-hit");
      setTimeout(() => {
        setButtonStatus("button-off");
      }, 242);
    } else {
      if (beat - hsbfGameData.beatMod > -10) {
        if (missedShots.length < 17) {
          setMissedShots((prevMissedShots) => [...prevMissedShots, Date.now()]);
        }
      }

      clearTimeoutByLabel();

      setButtonStatus("button-miss");
      setTimeout(() => {
        setButtonStatus("button-off");
      }, 242);
    }
  };

  //--> calculates results when any gameButton is clicked at any time
  const handleShoot = () => {
    setTargetBlocker(true);
    setTimeout(() => {
      setTargetBlocker(false);
    }, 200);
    shootResultDefiner();
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
      // onTouchStart={handleShoot}
      onClick={handleShoot}
    >
      {label.toUpperCase()}
    </button>
  );
};

export default GameButton;

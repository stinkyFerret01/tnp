//==> Game button est l'element principal du jeux pour le Player
//==> il s'invoque avec une prop "word" qui défini sa valeur
import { useEffect, useState } from "react";

const GameButton = ({
  label,
  goodWords,
  setScore,
  setMissedTargets,
  missedShots,
  setMissedShots,
  setButtonActivationTimeOutIds,
}) => {
  //==> stores the button status
  const [buttonStatus, setButtonStatus] = useState("button-off");

  //==> block Player's click when true (anti-spam)
  const [targetBlocker, setTargetBlocker] = useState(false);

  //==> stores the time out from "on" to "miss"
  const [turnOffTimeoutId, setTurnOffTimeoutId] = useState(null);

  //--> starts an activation delay when the label is detected in [goodWords]
  const buttonActivater = () => {
    // let delayApproach = 1780;
    let delayApproach = 4520;
    let delayActive = 400;
    const buttonActivationTimeOut = setTimeout(() => {
      setButtonStatus("button-on");
      const turnTargetOff = setTimeout(() => {
        setButtonStatus("button-off");
        setMissedTargets((prevMissedTargets) => prevMissedTargets + 1);
      }, delayActive);
      setTurnOffTimeoutId(turnTargetOff);
    }, delayApproach);
    setButtonActivationTimeOutIds((prevIdsArray) => [
      ...prevIdsArray,
      buttonActivationTimeOut,
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
      setScore((prevScore) => prevScore + 1);
      missCanceler();
      setButtonStatus("button-hit");
      setTimeout(() => {
        setButtonStatus("button-off");
      }, 242);
    } else {
      if (missedShots.length < 16) {
        setMissedShots((prevMissedShots) => [...prevMissedShots, Date.now()]);
      }
      setButtonStatus("button-miss");
      setTimeout(() => {
        setButtonStatus("button-off");
      }, 121);
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
      onClick={() => handleShoot()}
    >
      {label.toUpperCase()}
    </button>
  );
};

export default GameButton;

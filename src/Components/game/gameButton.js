//==> Game button est l'element principal du jeux pour le Player
//==> il s'invoque avec une prop "word" qui défini sa valeur
import { useEffect, useState } from "react";

const GameButton = ({
  active,
  word,
  score,
  setScore,
  missedShots,
  setMissedShots,
}) => {
  //==> stores the button status
  const [buttonStatus, setButtonStatus] = useState("button-off");

  //==> block Player's click when true (anti-spam)
  const [targetBlocker, setTargetBlocker] = useState(false);

  //==> stores the time out from "on" to "miss"
  const [turnOffTimeoutId, setTurnOffTimeoutId] = useState(null);

  //--> cuts the turnOffTimeout
  const missCanceler = () => {
    if (turnOffTimeoutId) {
      clearTimeout(turnOffTimeoutId);
    }
  };

  //-->

  //-->
  const shootResultDefiner = () => {
    if (buttonStatus === "button-on" && !targetBlocker) {
      setScore((prevScore) => prevScore + 1);
      missCanceler();
      setButtonStatus("button-hit");
      setTimeout(() => {
        setButtonStatus("button-off");
      }, 242);
    } else if (targetBlocker) {
      if (missedShots.length < 10) {
        setMissedShots((prevMissedShots) => [...prevMissedShots, Date.now()]);
      }
      setButtonStatus("button-miss");
      setTimeout(() => {
        setButtonStatus("button-off");
      }, 150);
    } else {
      if (missedShots.length < 10) {
        setMissedShots((prevMissedShots) => [...prevMissedShots, Date.now()]);
      }
      setButtonStatus("button-miss");
      setTimeout(() => {
        setButtonStatus("button-off");
      }, 150);
    }
  };

  const handleShoot = () => {
    setTargetBlocker(true);
    setTimeout(() => {
      setTargetBlocker(false);
    }, 200);
    shootResultDefiner();
  };

  useEffect(() => {
    if (active) {
      let delayApproach = 1780;
      let delayActive = 400;
      setTimeout(() => {
        setButtonStatus("button-on");
        const turnTargetOff = setTimeout(() => {
          setButtonStatus("button-miss");
          setTimeout(() => {
            setButtonStatus("button-off");
          }, 150);
        }, delayActive);
        setTurnOffTimeoutId(turnTargetOff);
      }, delayApproach);
    }
  }, [active]);

  return (
    <button className={buttonStatus} onClick={() => handleShoot()}>
      {word.toUpperCase()}
    </button>
  );
};

export default GameButton;

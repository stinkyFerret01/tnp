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
  const [buttonStyle, setButtonStyle] = useState("button2off");
  const [targetBlocker, setTargetBlocker] = useState(false);
  const [turnOffTimeoutId, setTurnOffTimeoutId] = useState(null);

  const abortLost = () => {
    if (turnOffTimeoutId) {
      clearTimeout(turnOffTimeoutId);
    }
  };

  const handleShoot = () => {
    setTargetBlocker(true);
    setTimeout(() => {
      setTargetBlocker(false);
    }, 200);
    if (buttonStyle === "button2on" && !targetBlocker) {
      setScore((prevScore) => prevScore + 1);
      abortLost();
      setButtonStyle("button2hit");
      setTimeout(() => {
        setButtonStyle("button2off");
      }, 242);
    } else if (targetBlocker) {
      if (missedShots.length < 10) {
        setMissedShots((prevMissedShots) => [...prevMissedShots, Date.now()]);
      }
      setButtonStyle("button2miss");
      setTimeout(() => {
        setButtonStyle("button2off");
      }, 150);
      console.log("BLOCK");
    } else {
      if (missedShots.length < 10) {
        setMissedShots((prevMissedShots) => [...prevMissedShots, Date.now()]);
      }
      setButtonStyle("button2miss");
      setTimeout(() => {
        setButtonStyle("button2off");
      }, 150);
    }
  };

  useEffect(() => {
    if (active) {
      let delayApproach = 1780;
      let delayActive = 400;
      setTimeout(() => {
        setButtonStyle("button2on");
        const turnTargetOff = setTimeout(() => {
          setButtonStyle("button2miss");
          setTimeout(() => {
            setButtonStyle("button2off");
          }, 150);
        }, delayActive);
        setTurnOffTimeoutId(turnTargetOff);
      }, delayApproach);
    }
  }, [active]);

  return (
    <button className={buttonStyle} onClick={() => handleShoot()}>
      {word.toUpperCase()}
    </button>
  );
};

export default GameButton;

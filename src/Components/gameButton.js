// Game button est l'element principal du jeux, le bouton à click
// il s'invoque avec une prop "word" qui défini sa valeur
import { useEffect, useState } from "react";

const GameButton2 = ({ active, word }) => {
  const [buttonStyle, setButtonStyle] = useState("button2off"); //---- V1 ----
  const [targetBlocker, setTargetBlocker] = useState(false);
  const [turnOffTimeoutId, setTurnOffTimeoutId] = useState(null);

  const abortLost = () => {
    if (turnOffTimeoutId) {
      clearTimeout(turnOffTimeoutId);
    }
  };

  const handleShoot = () => {
    console.log("CLICK");
    setTargetBlocker(true);
    setTimeout(() => {
      setTargetBlocker(false);
    }, 200);
    if (buttonStyle === "button2on" && !targetBlocker) {
      abortLost();
      setButtonStyle("button2hit");
      setTimeout(() => {
        setButtonStyle("button2off");
      }, 242);
      console.log("OK");
    } else if (targetBlocker) {
      setButtonStyle("button2miss");
      setTimeout(() => {
        setButtonStyle("button2off");
      }, 150);
      console.log("BLOCK");
    } else {
      setButtonStyle("button2miss");
      setTimeout(() => {
        setButtonStyle("button2off");
      }, 150);
      console.log("BAD");
    }
  };

  useEffect(() => {
    if (active) {
      let delayApproach = 1780;
      let delayActive = 400;
      //   const buttonStartTimeOut = setTimeout(() => {
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

export default GameButton2;

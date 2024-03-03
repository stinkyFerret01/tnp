// Game button est l'element principal du jeux, le bouton à click
// il s'invoque avec une prop "word" qui défini sa valeur
import { useEffect, useState } from "react";

const GameButton2 = ({ word, goodWords }) => {
  const [targetStatus, setTargetStatus] = useState("target-approach"); //---- V1 ----
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
    if (targetStatus === "target-active" && !targetBlocker) {
      abortLost();
      setTargetStatus("target-down");
      setTimeout(() => {
        setTargetStatus("target-off");
      }, 242);
      console.log("OK");
    } else if (targetBlocker) {
      console.log("BLOCK");
    } else {
      console.log("BAD");
    }
  };

  useEffect(() => {
    const styleDefiner = () => {
      let delayApproach = 1880;
      let delayActive = 300;
      const buttonStartTimeOut = setTimeout(() => {
        setTargetStatus("target-active");
        const turnTargetOff = setTimeout(() => {
          setTargetStatus("target-lost");
          setTimeout(() => {
            setTargetStatus("target-off");
          }, 100);
        }, delayActive);
        setTurnOffTimeoutId(turnTargetOff);
      }, delayApproach);
      return () => clearTimeout(buttonStartTimeOut);
    };
    styleDefiner();
    // eslint-disable-next-line;
  }, [goodWords]);

  return (
    <button className="game-button" onClick={() => handleShoot()}>
      <article className={targetStatus}>{word.toUpperCase()}</article>
    </button>
  );
};

export default GameButton2;

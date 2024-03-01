// Game button est l'element principal du jeux, le bouton à click
// il s'invoque avec une prop "word" qui défini sa valeur
import { useEffect, useState } from "react";

const GameButton = ({ word, goodWords }) => {
  const [targetStatus, setTargetStatus] = useState("target-off");
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
    }, 300);
    if (targetStatus === "target-on" && !targetBlocker) {
      abortLost();
      setTargetStatus("target-down");
      setTimeout(() => {
        setTargetStatus("target-off");
      }, 100);
      console.log("OK");
    } else if (targetBlocker) {
      console.log("BLOOCK");
    } else {
      console.log("BAD");
    }
  };

  useEffect(() => {
    const styleDefiner = () => {
      let delayStart = 485;
      let delayOn = 300;
      if (goodWords && goodWords.includes(word)) {
        setTargetStatus("target-start");
        const buttonStartTimeOut = setTimeout(() => {
          setTargetStatus("target-on");
          const turnTargetOff = setTimeout(() => {
            setTargetStatus("target-lost");
            setTimeout(() => {
              setTargetStatus("target-off");
            }, 100);
          }, delayOn);
          setTurnOffTimeoutId(turnTargetOff);
        }, delayStart);
        return () => clearTimeout(buttonStartTimeOut);
      }
    };
    styleDefiner();
  }, [goodWords]);

  return (
    <button className="game-button" onClick={() => handleShoot()}>
      <article className={targetStatus}>{word.toUpperCase()}</article>
    </button>
  );
};

export default GameButton;

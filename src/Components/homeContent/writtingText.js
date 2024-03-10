import React, { useEffect, useState } from "react";

const WrittingText = ({ text }) => {
  //==> text to display
  const [texteAffiche, setTexteAffiche] = useState("");
  const [underScore, setUnderScore] = useState(null);

  //--> underscore blinker
  useEffect(() => {
    if (!underScore) {
      setTimeout(() => {
        setUnderScore("_");
      }, 242);
    } else {
      setTimeout(() => {
        setUnderScore(null);
      }, 242);
    }
  }, [underScore]);

  //--> sets the text to display
  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setTexteAffiche(text.slice(0, index + 1));
      index++;
      if (index >= text.length) {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <div className="game-text-container" style={{ whiteSpace: "pre-wrap" }}>
      {texteAffiche}
      {underScore}
    </div>
  );
};

export default WrittingText;

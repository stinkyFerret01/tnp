import React, { useEffect, useState } from "react";

const WrittingText = ({ text, terminalEnabled, setTerminalEnabled }) => {
  //==> text to display
  const [displayedText, setDisplayedText] = useState("");
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
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index >= text.length) {
        setTerminalEnabled(true);
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [text, setTerminalEnabled]);

  return (
    <div
      onClick={() => setTerminalEnabled(true)}
      className="game-text-container centered"
      style={{ whiteSpace: "pre-wrap" }}
    >
      {displayedText}
      {!terminalEnabled && underScore}
    </div>
  );
};

export default WrittingText;

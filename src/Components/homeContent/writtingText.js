import React, { useEffect, useState } from "react";

const WrittingText = ({
  text,
  terminalEnabled,
  setTerminalEnabled,
  displayTermComHelper,
}) => {
  //==> text to display
  const [displayedText, setDisplayedText] = useState("");
  const [underScore, setUnderScore] = useState(" ");

  const [displayIntervalId, setDisplayIntervalId] = useState(null);

  //--> underscore blinker
  useEffect(() => {
    if (underScore === " ") {
      setTimeout(() => {
        setUnderScore("_");
      }, 240);
    } else {
      setTimeout(() => {
        setUnderScore(" ");
      }, 240);
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
    setDisplayIntervalId(intervalId);

    return () => clearInterval(intervalId);
  }, [text, setTerminalEnabled]);

  //==> displays the full text when clicked on
  const textSpoiler = () => {
    clearInterval(displayIntervalId);
    setTerminalEnabled(true);
    setTimeout(() => {
      setDisplayedText(text);
    }, 110);
  };

  return (
    !displayTermComHelper && (
      <div
        onClick={textSpoiler}
        className="game-text-container centered"
        style={{ whiteSpace: "pre-wrap" }}
      >
        {displayedText}
        {!terminalEnabled && underScore}
      </div>
    )
  );
};

export default WrittingText;

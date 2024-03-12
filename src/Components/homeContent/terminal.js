import { useState } from "react";

const Terminal = ({
  setIsLoading,
  setBios,
  setDisplayControl,
  terminalEnabled,
  displayTermComHelper,
  setDisplayTermComHelper,
}) => {
  const [terminalCommand, setTerminalCommand] = useState("");

  //--> sets the command to display on the screen
  const handleInput = (event) => {
    if (terminalCommand.length < 12) {
      setTerminalCommand(
        (prevTermCom) => prevTermCom + event.nativeEvent.data.toLowerCase()
      );
    }
    event.target.value = "";
  };

  //--> executes Player commands when "enter" is clicked
  const terminalCommandExecuter = () => {
    if (terminalCommand === "erase") {
      localStorage.removeItem("bestScore");
    } else if (terminalCommand === "core") {
      setBios(true);
    } else if (terminalCommand === "!core") {
      setBios(false);
    } else if (terminalCommand === "control") {
      setDisplayControl(true);
    } else if (terminalCommand === "!control") {
      setDisplayControl(false);
    } else if (terminalCommand === "help") {
      setDisplayTermComHelper(true);
    } else if (terminalCommand === "!help") {
      setDisplayTermComHelper(false);
    } else if (terminalCommand === "buzzle") {
      window.location.href = "https://buzzlegame.netlify.app/";
    } else if (terminalCommand === "dev") {
      window.location.href = "https://github.com/stinkyFerret01";
    } else if (terminalCommand === "reset") {
      setBios(false);
      setDisplayControl(false);
      setDisplayTermComHelper(false);
    } else if (terminalCommand === "play") {
      setIsLoading(5);
    }
    setTerminalCommand("");
  };

  //--> listens for special keyboard inputs
  const handleKeyDown = (event) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      setTerminalCommand(terminalCommand.slice(0, -1));
    }
    if (event.key === "Enter") {
      event.preventDefault();
      terminalCommandExecuter();
    }
  };

  return (
    terminalEnabled && (
      <div className="game-text-container centered">
        <div
          className="game-text-container"
          style={{
            whiteSpace: "pre-wrap",
            position: "relative",
          }}
        >
          {terminalCommand}
          <span className="underscore">{"_"}</span>
          <input
            type="text"
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            className="terminal-input"
          />
        </div>
        {!displayTermComHelper && (
          <div
            className="game-text-container"
            style={{ fontSize: "0.6rem", margin: "2vh" }}
          >
            type "help"
          </div>
        )}
      </div>
    )
  );
};

export default Terminal;

import { useState } from "react";

const Terminal = ({ setBios, setDisplayControl }) => {
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
    } else if (terminalCommand === "bios") {
      setBios(true);
    } else if (terminalCommand === "!bios") {
      setBios(false);
    } else if (terminalCommand === "!bios") {
      setBios(false);
    } else if (terminalCommand === "control") {
      setDisplayControl(true);
    } else if (terminalCommand === "!control") {
      setDisplayControl(false);
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
  );
};

export default Terminal;

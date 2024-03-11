import { useState } from "react";

const Terminal = () => {
  const [terminalCommand, setTerminalCommand] = useState("");

  const handleInput = (event) => {
    console.log(event);
    if (terminalCommand.length < 12) {
      setTerminalCommand(
        (prevTermCom) => prevTermCom + event.nativeEvent.data.toLowerCase()
      );
    }
    event.target.value = "";
  };

  const terminalCommandExecuter = () => {
    if (terminalCommand === "erase") {
      localStorage.removeItem("bestScore");
      setTerminalCommand("");
    }
  };

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

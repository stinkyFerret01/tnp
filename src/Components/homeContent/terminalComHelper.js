import { useEffect } from "react";
import terminalCommands from "../../Data/terminalCommands";

const TerminalComHelper = ({
  isLoading,
  displayTermComHelper,
  setDisplayTermComHelper,
}) => {
  //--> to display before each displayed command
  let commandPrefix = "c/-> ";

  //--> turns the terminal helper off when starting game
  useEffect(() => {
    if (isLoading > 0) {
      setDisplayTermComHelper(false);
    }
  }, [isLoading, setDisplayTermComHelper]);

  return (
    displayTermComHelper && (
      <div className="terminal-com-helper">
        <div className="terminal-com-help-top">
          {"--> terminal command helper:"}
          <button
            className="game-element-container"
            style={{ height: "1rem" }}
            onClick={() => setDisplayTermComHelper(false)}
          >
            X
          </button>
        </div>
        <div className="scrollable-list">
          {terminalCommands.map((command) => {
            return (
              <p key={command.command}>
                {commandPrefix}
                <span style={{ color: "gold" }}>{command.command}</span> :{" "}
                {command.description}
              </p>
            );
          })}
        </div>
      </div>
    )
  );
};

export default TerminalComHelper;

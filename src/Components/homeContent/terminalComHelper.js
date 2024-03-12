import { useEffect } from "react";
import terminalCommands from "../../Data/terminalCommands";

const TerminalComHelper = ({
  isLoading,
  displayTerminalComHelper,
  setDisplayTerminalComHelper,
}) => {
  //--> turns the terminal helper off when starting game
  useEffect(() => {
    if (isLoading > 0) {
      setDisplayTerminalComHelper(false);
    }
  }, [isLoading, setDisplayTerminalComHelper]);

  return (
    displayTerminalComHelper && (
      <div className="terminal-com-helper" style={{ display: "flex" }}>
        <div>
          {terminalCommands.map((commmand) => {
            return (
              <p>
                '{commmand.command}': {commmand.description}
              </p>
            );
          })}
        </div>
        <button
          className="game-element-container"
          style={{ height: "1rem" }}
          onClick={() => setDisplayTerminalComHelper(false)}
        >
          X
        </button>
      </div>
    )
  );
};

export default TerminalComHelper;

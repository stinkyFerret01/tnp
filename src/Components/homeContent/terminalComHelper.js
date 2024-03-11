const TerminalComHelper = ({
  displayTerminalComHelper,
  setDisplayTerminalComHelper,
}) => {
  return (
    displayTerminalComHelper && (
      <div className="terminal-com-helper" style={{ display: "flex" }}>
        <div>
          <p>"bios": sets the screen blue ("!bios" to set back to black)</p>
          <p>"buzzle": navigates to Buzzle, the 2D puzzle game</p>
          <p>"control": displays the control panel ("!control" to close)</p>
          <p>"dev": navigates to the developer gitHub</p>
          <p>"erase": erases the best score from your device</p>
          <p>"help": displays the teminal command helper ("!help" to close)</p>
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

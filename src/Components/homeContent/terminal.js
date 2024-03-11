import { useState, useEffect } from "react";

const Terminal = () => {
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

  return (
    <div
      //   onClick={handleTerminalClick}
      className="game-text-container"
      style={{ whiteSpace: "pre-wrap" }}
    >
      {underScore}
    </div>
  );
};

export default Terminal;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import texts from "../Data/texts";

import WrittingText from "../Components/homeContent/writtingText";
import StartButton from "../Components/homeContent/startButton";
import LoadingBar from "../Components/homeContent/loadingBar";
import Terminal from "../Components/homeContent/terminal";
import TerminalComHelper from "../Components/homeContent/terminalComHelper";

const HomePage = ({
  setBios,
  setDisplayControl,
  setAudioCommand,
  isPlaying,
  isLoading,
  setIsLoading,
}) => {
  //--> access to the terminal enabled when true
  const [terminalEnabled, setTerminalEnabled] = useState(false);

  //--> displays the terminal command helper when true
  const [displayTerminalComHelper, setDisplayTerminalComHelper] =
    useState(false);

  const navigate = useNavigate();

  //--> starts the game (trigging isPlaying when audio is starting)
  useEffect(() => {
    if (isLoading === 5 && !isPlaying) {
      setAudioCommand({
        actionX: "play",
      });
    }
  }, [isLoading, isPlaying, setAudioCommand]);

  //--> navigates to gamePage when isPlaying gets trigged
  useEffect(() => {
    if (isLoading === 100) {
      setTimeout(() => {
        navigate("/game");
      }, 60);
    }
  }, [isLoading, navigate]);

  return (
    <main className="home-page">
      {isLoading === 0 ? (
        <div className="home-page-alt">
          <div className="responsive-home">
            <div className="responsive-home-container">
              <WrittingText
                text={texts.introText}
                terminalEnabled={terminalEnabled}
                setTerminalEnabled={setTerminalEnabled}
                displayTerminalComHelper={displayTerminalComHelper}
              />
            </div>
            <div className="responsive-home-short">
              <StartButton
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                isPlaying={isPlaying}
                displayTerminalComHelper={displayTerminalComHelper}
              />
            </div>
            <div className="responsive-home-container">
              <Terminal
                setIsLoading={setIsLoading}
                setBios={setBios}
                setDisplayControl={setDisplayControl}
                terminalEnabled={terminalEnabled}
                displayTerminalComHelper={displayTerminalComHelper}
                setDisplayTerminalComHelper={setDisplayTerminalComHelper}
              />
            </div>
          </div>
          <div className="game-text-container credits">{texts.creditText}</div>
          <TerminalComHelper
            isLoading={isLoading}
            displayTerminalComHelper={displayTerminalComHelper}
            setDisplayTerminalComHelper={setDisplayTerminalComHelper}
          />
        </div>
      ) : (
        <LoadingBar isLoading={isLoading} />
      )}
    </main>
  );
};

export default HomePage;

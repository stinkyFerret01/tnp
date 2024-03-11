import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import WrittingText from "../Components/homeContent/writtingText";
import StartButton from "../Components/homeContent/startButton";
import Terminal from "../Components/homeContent/terminal";
import TerminalComHelper from "../Components/homeContent/terminalComHelper";

const texts = {
  introText:
    // "StinkyFerret_Production  \npresents:       \n-HBFS-       \nthe_rythm_game",
    "StinkyFerret_Production\npresents:\n-HBFS-\nthe_rythm_game",
  creditText:
    "This project is for demonstration purposes,\nit has no commercial intent.\nAll musical rights belong to their respective owners.",
};

const HomePage = ({
  setBios,
  setDisplayControl,
  setAudioCommand,
  isPlaying,
  isLoading,
  setIsLoading,
}) => {
  const [terminalEnabled, setTerminalEnabled] = useState(false);
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
      }, 100);
    }
  }, [isLoading, navigate]);

  return (
    <main className="home-page">
      {isLoading === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="responsive-home">
            <div
              className="responsive-home-container"
              style={
                isLoading ? { visibility: "hidden" } : { visibility: "display" }
              }
            >
              <WrittingText
                text={texts.introText}
                terminalEnabled={terminalEnabled}
                setTerminalEnabled={setTerminalEnabled}
              ></WrittingText>
            </div>
            <div className="responsive-home-container">
              <StartButton
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                isPlaying={isPlaying}
              ></StartButton>
            </div>
            <div className="responsive-home-short">
              {terminalEnabled && (
                <Terminal
                  setBios={setBios}
                  setDisplayControl={setDisplayControl}
                  displayTerminalComHelper={displayTerminalComHelper}
                  setDisplayTerminalComHelper={setDisplayTerminalComHelper}
                ></Terminal>
              )}
            </div>
          </div>

          <div
            className="game-text-container credits"
            style={
              isLoading ? { visibility: "hidden" } : { visibility: "display" }
            }
          >
            {texts.creditText}
          </div>
        </div>
      ) : (
        <div>
          <div className="loading-bar-container">
            <div
              className="loading-bar"
              style={{
                width: `${isLoading}%`,
              }}
            ></div>
          </div>
          <div className="game-text-container centered">
            Loading {isLoading} %
          </div>
        </div>
      )}
      <TerminalComHelper
        displayTerminalComHelper={displayTerminalComHelper}
        setDisplayTerminalComHelper={setDisplayTerminalComHelper}
      />
    </main>
  );
};

export default HomePage;

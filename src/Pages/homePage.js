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
  //==> access to the terminal enabled when true
  const [terminalEnabled, setTerminalEnabled] = useState(false);

  //==> displays the terminal command helper when true
  const [displayTermComHelper, setDisplayTermComHelper] = useState(false);
  //==> sets the terminal on another position when <= 400px (mobile on side)
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  const navigate = useNavigate();

  //--> controls the screenHeight to adapt style
  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //--> starts the game (trigging isPlaying when audio is starting)
  useEffect(() => {
    if (isLoading === 5 && !isPlaying) {
      setAudioCommand({
        actionX: "play",
      });
    } else if (isLoading === 100) {
      setTimeout(() => {
        navigate("/game");
      }, 60);
    }
  }, [isLoading, isPlaying, setAudioCommand, navigate]);

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
                displayTermComHelper={displayTermComHelper}
              />
            </div>
            <div className="responsive-home-short">
              <StartButton
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                isPlaying={isPlaying}
                displayTermComHelper={displayTermComHelper}
              />
            </div>
            <div
              className="responsive-home-container"
              style={
                displayTermComHelper && screenHeight <= 400
                  ? { marginLeft: "36vw" }
                  : {}
              }
            >
              <Terminal
                setIsLoading={setIsLoading}
                setBios={setBios}
                setDisplayControl={setDisplayControl}
                terminalEnabled={terminalEnabled}
                displayTermComHelper={displayTermComHelper}
                setDisplayTermComHelper={setDisplayTermComHelper}
              />
            </div>
          </div>
          <div className="game-text-container credits">{texts.creditText}</div>
          <TerminalComHelper
            isLoading={isLoading}
            displayTermComHelper={displayTermComHelper}
            setDisplayTermComHelper={setDisplayTermComHelper}
          />
        </div>
      ) : (
        <LoadingBar isLoading={isLoading} />
      )}
    </main>
  );
};

export default HomePage;

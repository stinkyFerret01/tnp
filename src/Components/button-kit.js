import { useState } from "react";

// ButtonKit est un interrupteur accompagné d'un témoin d'activation
// il s'invoque avec une prop "color" qui défini la couleur du témoin
const ButtonKit = ({ color }) => {
  const [isOn, setIsOn] = useState(false); // statut d'activation

  // lightToggler détemine le statut d'activation (true ou false)
  const lightToggler = () => {
    if (isOn) {
      setIsOn(false);
    } else {
      setIsOn(true);
    }
  };

  // colorSetter détermine l'affichage du témoin en fonction de l'activation
  const colorSetter = () => {
    let result = {
      backgroundColor: "black",
    };
    if (isOn) {
      result = { backgroundColor: `${color}` };
    }
    return result;
  };

  // variables de style pour l'intérrupteur et le témoin
  const buttonStyle = {
    color: `${color}`,
  };
  const lightStyle = colorSetter();

  return (
    <article>
      <button
        className="colorButton"
        style={buttonStyle}
        onClick={() => lightToggler()}
      >
        PRESS for color
      </button>
      <div className="buttonLight" style={lightStyle}></div>
    </article>
  );
};

export default ButtonKit;

import keyboardButtonLocations from "./keyboard-button-locations.json";

const Keyboard = () => {
  const keyboardRows = Object.keys(keyboardButtonLocations).map(row =>
    (
      <div className="keyboard-row">
        {keyboardButtonLocations[row].map(keyObj => (
          <div className={`keyboard-button ${keyObj.key.length > 1 ? 'keyboard-word-button' : '' }`}>
            {keyObj.key}
          </div>
        ))}
      </div>
    )
  )

  return (
    <div id="keyboard">
      {keyboardRows}
    </div>
  );
};

export default Keyboard;

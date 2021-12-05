import keyboardButtonLocations from "./keyboard-button-locations.json";
import { useEffect } from 'preact/hooks'

type KeyboardKey = {
  key: String,
  code: String
}

const mapKeyToIcon = (key: String) => {
  switch (key) {
    case "Backspace":
      return "<-"
    case "CapsLock":
      return "Caps"
    default:
      return key
  }
}

const Keyboard = () => {
  useEffect(() => {
    document.addEventListener("keydown", onKeyboardButtonDown)
    document.addEventListener("keyup", onKeyboardButtonUp)
    return () => {
      document.removeEventListener("keydown", onKeyboardButtonDown)
    }
  }, [])

  const onKeyboardButtonDown = (event: KeyboardEvent) => {
    event.preventDefault()
    const title = event.code
    const button: HTMLButtonElement = document.querySelector(`[title="${title}"]`);
    button.click();
    button.focus();
  }

  const onKeyboardButtonUp = (event: KeyboardEvent) => {
    event.preventDefault()
    const title = event.code
    const button: HTMLButtonElement = document.querySelector(`[title="${title}"]`);
    button.blur();
  }

  const KeyboardRows = () => Object.keys(keyboardButtonLocations).map(
    row => (
      <div className="keyboard-row">
        {keyboardButtonLocations[row].map((keyObj: KeyboardKey) => (
          <button 
            title={`${keyObj.code}`}
            className={`keyboard-button ${keyObj.key.length > 1 ? 'keyboard-word-button' : ''}`}>
            {mapKeyToIcon(keyObj.key)}
          </button>
        ))}
      </div>
    )
  )
  
  return (
    <div id="keyboard">
      <KeyboardRows />
    </div>
  );
};

export default Keyboard;

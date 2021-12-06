import keyboardButtonLocations from "./keyboard-button-locations.json";
import { useEffect, useState, StateUpdater } from 'preact/hooks'
import "preact/debug";

type KeyboardKey = {
  key: string,
  code: string
}

const allKeys: KeyboardKey[] = [].concat.apply([], Object.values(keyboardButtonLocations))
const getRandomKey = () => {
  return allKeys[Math.floor(Math.random() * allKeys.length)]
}

const getButtonElement = (code: string) : HTMLButtonElement => {
    return document.querySelector(`[title="${code}"]`);
}

const mapKeyToIcon = (key: string) => {
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
  const [jiggleKey, setJiggleKey]: [KeyboardKey, StateUpdater<KeyboardKey>] = useState(getRandomKey());
  const makeKeyboardButtonJiggle = (buttonToJiggle: HTMLButtonElement) => {
    buttonToJiggle.classList.add("jiggle")
    buttonToJiggle.addEventListener("keyup", onJiggleKeyUp)
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeyboardButtonDown)
    document.addEventListener("keyup", onKeyboardButtonUp)
    const buttonToJiggle = getButtonElement(jiggleKey.code)
    makeKeyboardButtonJiggle(buttonToJiggle)
    
    return () => {
      document.removeEventListener("keydown", onKeyboardButtonDown)
      document.addEventListener("keyup", onKeyboardButtonUp)
    }
  }, [])
  
  useEffect(() => {
    const buttonToJiggle = getButtonElement(jiggleKey.code)
    makeKeyboardButtonJiggle(buttonToJiggle)
  }, [jiggleKey])

  const onKeyboardButtonDown = (event: KeyboardEvent) => {
    event.preventDefault()
    const button: HTMLButtonElement = getButtonElement(event.code)
    button.click();
    button.focus();
  }

  const onKeyboardButtonUp = (event: KeyboardEvent) => {
    event.preventDefault()
    const button: HTMLButtonElement = getButtonElement(event.code)
    button.blur();
  }

  const onJiggleKeyUp = (event: KeyboardEvent) => {
    event.preventDefault()
    const buttonToJiggle = getButtonElement(jiggleKey.code)
    buttonToJiggle.classList.remove("jiggle")
    setJiggleKey(getRandomKey())
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

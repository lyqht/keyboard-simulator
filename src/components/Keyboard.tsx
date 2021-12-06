import { useEffect, useState, StateUpdater } from 'preact/hooks'
import KeyboardRows, { KeyboardKey, getRandomKey } from './KeyboardRows';

const getButtonElement = (code: string): HTMLButtonElement => {
  return document.querySelector(`[title="${code}"]`);
}

const Keyboard = ({ upStreak }) => {
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
    buttonToJiggle.removeEventListener("keyup", onJiggleKeyUp)
    setJiggleKey(getRandomKey())
    upStreak()
  }

  return (
    <div id="keyboard">
      <KeyboardRows />
    </div>
  );
};

export default Keyboard;

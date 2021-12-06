import { useEffect, useState, StateUpdater } from 'preact/hooks'
import KeyboardRows, { KeyboardKey, getRandomKey } from './KeyboardRows';

const getButtonElement = (code: string): HTMLButtonElement => {
  return document.querySelector(`[title="${code}"]`);
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
    buttonToJiggle.removeEventListener("keyup", onJiggleKeyUp)
    setJiggleKey(getRandomKey())
  }

  return (
    <>
      <p>A random key will be <span id="hint-text">jiggling</span> until you click it on the keyboard</p>
      <div id="keyboard">
        <KeyboardRows />
      </div>
    </>
  );
};

export default Keyboard;

import keyboardButtonLocations from "./keyboard-button-locations.json";

export type KeyboardKey = {
  key: string,
  code: string
}

export const allKeys: KeyboardKey[] = [].concat.apply([], Object.values(keyboardButtonLocations))
export const getRandomKey = () => {
  return allKeys[Math.floor(Math.random() * allKeys.length)]
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

export default KeyboardRows
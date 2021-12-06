import Keyboard from "./Keyboard"
import { useState } from 'preact/hooks'

const GameArea = () => {
    const [streak, setStreak] = useState(0);
    const StreakCounter = () => (
        <div id="streak-counter">
            Streak: {streak}
        </div>
    )

    return (
        <div id='game-area'>
            <p>A random key will be <span id="hint-text">jiggling</span> until you click it on the keyboard</p>
            <Keyboard
                upStreak={() => setStreak(streak + 1)} />
            <StreakCounter />
        </div>
    )
}

export default GameArea
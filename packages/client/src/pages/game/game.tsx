import { useState } from 'react'
import { StartScreen } from './start_screen'

const Game = () => {
  const [start, setStart] = useState(false)

  return <>{start ? 'Game' : <StartScreen setStart={setStart} />}</>
}

export default Game

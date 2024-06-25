import { useCallback, useState } from 'react'
import { StartScreen } from './StartScreen'

const Game = () => {
  const [start, setStart] = useState(false)

  const changeStart = useCallback(() => {
    setStart(true)
  }, [])

  return <>{start ? 'Game' : <StartScreen changeStart={changeStart} />}</>
}

export default Game

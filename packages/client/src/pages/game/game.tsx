import React, { useCallback, useState } from 'react'
import { ErrorBoundary } from '../../components/ErrorBoundary'
import { HamsterCanvas } from './HamsterCanvas'

const Game = () => {
  const [countClick, setCountClick] = useState<number>(0)

  const onClickCircle = useCallback(() => {
    setCountClick(prev => prev + 1)
  }, [])

  return (
    <ErrorBoundary>
      <div>Game: count click-{countClick}</div>
      <HamsterCanvas onClickCircle={onClickCircle} />
    </ErrorBoundary>
  )
}

export default Game

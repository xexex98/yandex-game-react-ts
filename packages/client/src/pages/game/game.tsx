import React from 'react'
import { ErrorBoundary } from '../../components/ErrorBoundary'

const Game = () => {
  return (
    <ErrorBoundary>
      <div>Game</div>
    </ErrorBoundary>
  )
}

export default Game

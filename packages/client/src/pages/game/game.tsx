import { Button } from '@mui/material'

import { HamsterCanvas } from './HamsterCanvas';
import { StartScreen } from './StartScreen';
import { useGameData } from './useGameData'

const Game = () => {
  const {
    onClickFullScreen,
    refToggler,
    onClickCircle,
    changeStart,
    countClick,
    start
  } = useGameData()

  return (
    <>
      <div>Game: count click-{countClick}</div>
      <Button
        ref={refToggler}
        variant='contained'
        onClick={onClickFullScreen}
      >
        Перейти в fullscreen режим
      </Button>
      {start ? (
        <HamsterCanvas onClickCircle={onClickCircle} />
      ) : (
        <StartScreen changeStart={changeStart} />
      )}
    </>
  );
};

export default Game;

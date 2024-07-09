import { Button } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store';
import {
  startGame,
  stopGame,
} from '../../store/modules/gameState/gameStateSlice';
import { EndScreen } from './EndScreen';
import { HamsterCanvas } from './HamsterCanvas';
import { StartScreen } from './StartScreen';
import { useGameData } from './useGameData';

const Game = () => {
  const { onClickFullScreen, refToggler, onClickCircle, countClick } =
    useGameData();

  const gameStatus = useAppSelector((state) => state.gameState.status);
  const dispatch = useAppDispatch();
  const changeStart = () => {
    dispatch(startGame());
  };
  const endGame = () => {
    dispatch(stopGame());
  };

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
      {gameStatus === 'started' ? (
        <Button
          variant='contained'
          onClick={endGame}
        >
          Закончить игру
        </Button>
      ) : (
        <></>
      )}
      {gameStatus === 'started' ? (
        <HamsterCanvas onClickCircle={onClickCircle} />
      ) : gameStatus === 'new' ? (
        <StartScreen changeStart={changeStart} />
      ) : (
        <EndScreen value={7} />
      )}
    </>
  );
};

export default Game;

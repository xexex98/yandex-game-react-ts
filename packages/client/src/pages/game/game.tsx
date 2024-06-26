import { useCallback, useState } from 'react';

import { HamsterCanvas } from './HamsterCanvas';
import { StartScreen } from './StartScreen';
  
const Game = () => {
  const [countClick, setCountClick] = useState<number>(0);
  const [start, setStart] = useState(false);
    
  const onClickCircle = useCallback(() => {
    setCountClick((prev) => prev + 1);
  }, []);
    
  const changeStart = useCallback(() => {
    setStart(true)
  }, []);

  return (
    <>
      <div>Game: count click-{countClick}</div>
      {start ? <HamsterCanvas onClickCircle={onClickCircle} /> : <StartScreen changeStart={changeStart}   
    </>
  );
};

export default Game;

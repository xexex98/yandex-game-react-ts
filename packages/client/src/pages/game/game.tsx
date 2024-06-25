import { useCallback, useState } from 'react';

import { HamsterCanvas } from './HamsterCanvas';

const Game = () => {
  const [countClick, setCountClick] = useState<number>(0);

  const onClickCircle = useCallback(() => {
    setCountClick((prev) => prev + 1);
  }, []);

  return (
    <>
      <div>Game: count click-{countClick}</div>
      <HamsterCanvas onClickCircle={onClickCircle} />
    </>
  );
};

export default Game;

import { FC } from 'react';

import { GameState } from '../../store/modules/gameState/gameStateSlice';
import { HamsterCanvas } from './HamsterCanvas';

interface Props extends GameState {}

const statusedGameComponent: FC<Props> = ({ status }) => {
  switch (status) {
    case 'started':
      return <HamsterCanvas />;
    case 'over':
      break;
    case 'paused':
      break;
    default:
      break;
  }
  return <div>statusedGameComponent</div>;
};

export default statusedGameComponent;

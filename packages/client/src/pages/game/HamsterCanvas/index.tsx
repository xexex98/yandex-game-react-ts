import { FC, useEffect, useRef } from 'react';

import Render from './core/Render';
import { Game } from './Game';

import './HamsterCanvas.css';

type Props = {
  endGame: () => void;
  setScore: (score: number) => void;
};

export const HamsterCanvas: FC<Props> = ({ endGame, setScore }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      handleResize();

      window.addEventListener('resize', handleResize);

      const game = new Game(canvas, endGame, setScore);

      game.startGame();

      return () => {
        window.removeEventListener('resize', handleResize);
        game.stopGame();
        const context = canvas.getContext('2d');

        if (context) {
          Render.clearContext(context);
        }
      };
    }
  });

  return (
    <div className='wrapper'>
      <canvas
        ref={canvasRef}
        className='canvas'
      />
    </div>
  );
};

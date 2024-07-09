import { Box, Button, Typography } from '@mui/material';
import { FC, MouseEventHandler, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../../store';
import { newGame } from '../../../store/modules/gameState/gameStateSlice';

// import './style.css';

type EndScreenProps = {
  value: number;
  onClick?: MouseEventHandler;
};

export const EndScreen: FC<EndScreenProps> = ({ value, onClick }) => {
  const dispatch = useAppDispatch();

  const startNewGame = useCallback(() => {
    dispatch(newGame());
  }, []);

  return (
    <Box
      height='100vh'
      bgcolor={'linear-gradient(black, #20263c)'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      sx={{
        background: 'linear-gradient(black, #20263c)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          color: '#FFF',
        }}
        className='animation-end-game'
      >
        <Typography
          component='h2'
          variant='h3'
          sx={{
            color: 'red',
          }}
        >
          Конец Игры
        </Typography>
        <Typography
          component='h3'
          variant='h4'
        >
          Ваш счет: {value ?? 3000}
        </Typography>
        <Link to='/'>
          <Button
            onClick={onClick}
            variant='contained'
          >
            На главный экран
          </Button>
        </Link>
        <Button
          onClick={startNewGame}
          variant='contained'
        >
          Новая игра
        </Button>
      </Box>
    </Box>
  );
};

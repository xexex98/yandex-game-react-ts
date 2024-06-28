import { Box, Button, Typography } from '@mui/material';
import { FC, MouseEventHandler } from 'react';

import './style.css';

type EndScreenProps = {
  value: number;
  onClick?: MouseEventHandler;
};

export const EndScreen: FC<EndScreenProps> = ({ value, onClick }) => {
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
        <Button
          onClick={onClick}
          variant='contained'
        >
          На главный экран
        </Button>
      </Box>
    </Box>
  );
};

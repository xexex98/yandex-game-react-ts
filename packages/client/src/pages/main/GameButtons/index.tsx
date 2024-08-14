import { Box, Button } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import style from './GameButtons.module.css';

export const GameButtons: FC = () => {
  return (
    <Box
      width={'100%'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Box
        width={360}
        display={'flex'}
        flexDirection={'column'}
      >
        <Link
          to='game'
          className={style.link}
        >
          <Button
            variant='contained'
            sx={{
              width: '100%',
            }}
          >
            Игра
          </Button>
        </Link>
        <Link
          to='leaders'
          className={style.link}
        >
          <Button
            variant='contained'
            sx={{
              width: '100%',
            }}
          >
            Таблица лидеров
          </Button>
        </Link>
        <Link
          to='forum'
          className={style.link}
        >
          <Button
            variant='contained'
            sx={{
              width: '100%',
            }}
          >
            Форум
          </Button>
        </Link>
        <Link
          to='profile'
          className={style.link}
        >
          <Button
            variant='contained'
            sx={{
              width: '100%',
            }}
          >
            Профиль
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

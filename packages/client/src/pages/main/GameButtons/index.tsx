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
            className={style.button}
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
            className={style.button}
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
            className={style.button}
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
            className={style.button}
          >
            Профиль
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

import { Box, Button } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import style from './AuthButtons.module.css';

export const AuthButtons: FC = () => {
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
          to='login'
          className={style.link}
        >
          <Button
            className={style.button}
            variant='contained'
            sx={{
              width: '100%',
            }}
          >
            Войти
          </Button>
        </Link>

        <Link
          to='registration'
          className={style.link}
        >
          <Button
            variant='outlined'
            className={style.button}
          >
            Зарегистрироваться
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

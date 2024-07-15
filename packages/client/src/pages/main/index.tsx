import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';

import { Loader } from '../../components/Loader';
import { useAppDispatch, useAppSelector } from '../../store';
import { getCurrentUser } from '../../store/modules/auth/authSlice';
import { AuthButtons } from './AuthButtons';
import { GameButtons } from './GameButtons';

export const MainPage = () => {
  const { isLoggedIn, status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(getCurrentUser());
    }
  }, [isLoggedIn, dispatch]);

  if (status === 'loading' || status === 'idle') {
    return <Loader />;
  }

  return (
    <Box
      height={'100vh'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
    >
      <Typography
        variant='h3'
        component='h1'
        marginBottom={'80px'}
      >
        {`Ludocoder's Clicker`}
      </Typography>
      {isLoggedIn ? <GameButtons /> : <AuthButtons />}
    </Box>
  );
};

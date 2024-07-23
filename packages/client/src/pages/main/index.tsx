import { Box } from '@mui/material';
import { useEffect } from 'react';

import Logo from '../../assets/logo.svg';
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
      <img
        src={Logo}
        style={{ height: 100, marginBottom: 40 }}
      />
      {isLoggedIn ? <GameButtons /> : <AuthButtons />}
    </Box>
  );
};

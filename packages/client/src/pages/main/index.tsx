import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import Logo from '../../assets/logo.svg';
import { Loader } from '../../components/Loader';
import { useAppDispatch, useAppSelector } from '../../store';
import { getCurrentUser, oAuthLogin } from '../../store/modules/auth/authSlice';
import { AuthButtons } from './AuthButtons';
import { GameButtons } from './GameButtons';

export const MainPage = () => {
  const { isLoggedIn, status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (code && !isLoggedIn) {
      dispatch(oAuthLogin(code));
      searchParams.delete('code');
      searchParams.delete('cid');
      setSearchParams(searchParams);
    } else if (!isLoggedIn && status !== 'loading') {
      dispatch(getCurrentUser());
    }
  }, [isLoggedIn, dispatch, code, searchParams, setSearchParams]);

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

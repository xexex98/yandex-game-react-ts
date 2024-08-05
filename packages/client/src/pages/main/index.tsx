import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import Logo from '../../assets/logo.svg';
import { Loader } from '../../components/Loader';
import { usePage } from '../../hooks/usePage';
import { PageInitArgs } from '../../routes';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  getCurrentUser,
  oAuthLogin,
  selectIsLoggedIn,
} from '../../store/modules/auth/authSlice';
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
    }
  }, [isLoggedIn, code]);

  usePage({ initPage: initMainPage });

  if (status === 'loading' || status === 'idle') {
    return <Loader />;
  }

  return (
    <div>
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
    </div>
  );
};

export const initMainPage = async ({ dispatch, state }: PageInitArgs) => {
  if (!selectIsLoggedIn(state) && state.auth.status !== 'loading') {
    return dispatch(getCurrentUser());
  }
};

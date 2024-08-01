import { Box } from '@mui/material';

import Logo from '../../assets/logo.svg';
import { Loader } from '../../components/Loader';
import { usePage } from '../../hooks/usePage';
import { PageInitArgs } from '../../routes';
import { useAppSelector } from '../../store';
import {
  getCurrentUser,
  selectIsLoggedIn,
} from '../../store/modules/auth/authSlice';
import { AuthButtons } from './AuthButtons';
import { GameButtons } from './GameButtons';

export const MainPage = () => {
  const { isLoggedIn, status } = useAppSelector((state) => state.auth);

  usePage({ initPage: initMainPage });

  return (
    <div>
      {status === 'loading' || status === 'idle' ? (
        <Loader />
      ) : (
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
      )}
    </div>
  );
};

export const initMainPage = async ({ dispatch, state }: PageInitArgs) => {
  if (!selectIsLoggedIn(state)) {
    return dispatch(getCurrentUser());
  }
};

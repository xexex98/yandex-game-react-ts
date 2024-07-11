import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store';
import { getCurrentUser } from '../../store/modules/auth/authSlice';
import { Loader } from '../Loader';

export const PrivateRoute = () => {
  const { isLoggedIn, status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoggedIn && status === 'idle') {
      dispatch(getCurrentUser());
    }
  }, [dispatch, isLoggedIn, status]);

  if (status === 'loading' || status === 'idle') {
    return <Loader />;
  }

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate
      to='/login'
      replace
    />
  );
};

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { RootState, useAppDispatch } from '../../store';
import { getCurrentUser } from '../../store/modules/auth/authSlice';

export const PrivateRoute = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(getCurrentUser());
    }
  }, [isLoggedIn, dispatch]);

  return isLoggedIn ? <Outlet /> : <Navigate to='/login' />;
};

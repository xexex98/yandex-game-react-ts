import { Alert } from '@mui/material';

import { COOKIE_IS_NOT_VALID } from '../../consts';
import { useAppSelector } from '../../store';

export const ErrorAuth = () => {
  const { status, error } = useAppSelector((state) => state.auth);

  if (status !== 'failed' || error === COOKIE_IS_NOT_VALID) {
    return null;
  }

  return (
    <Alert
      sx={{ mt: 1, mb: 2 }}
      severity='error'
      variant='outlined'
    >
      {error}
    </Alert>
  );
};

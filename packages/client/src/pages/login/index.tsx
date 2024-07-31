import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { validateAllFields, validateField } from '../../helpers/validate';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  getCurrentUser,
  login,
  oAuthServiceId,
} from '../../store/modules/auth/authSlice';

export type FormSignIn = {
  login: string;
  password: string;
};

type FormSignInErrors = Partial<FormSignIn>;

export function SignIn() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoggedIn, status, error } = useAppSelector((state) => state.auth);

  const [formValues, setFormValues] = useState<FormSignIn>({
    login: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState<FormSignInErrors>({});

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getCurrentUser());
    }
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate, status, dispatch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const error = validateField(name, value);

    setFormErrors((prevState) => ({
      ...prevState,
      [name]: error,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateAllFields(formValues);

    setFormErrors(validationErrors);

    const noErrors = Object.values(validationErrors).every((error) => !error);

    if (noErrors) {
      await dispatch(login(formValues));
    }
  };

  const handleClick = () => {
    dispatch(oAuthServiceId());
  };

  return (
    <Container
      component='main'
      maxWidth='xs'
      sx={{ paddingTop: '20px' }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component='h1'
          variant='h5'
        >
          Sign in
        </Typography>
        <Box
          noValidate
          component='form'
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          <TextField
            onBlur={handleBlur}
            value={formValues.login}
            error={Boolean(formErrors.login)}
            helperText={formErrors.login}
            onChange={handleChange}
            margin='normal'
            required
            fullWidth
            name='login'
            label='Login'
            id='login'
            autoComplete='username'
          />
          <TextField
            onBlur={handleBlur}
            value={formValues.password}
            error={Boolean(formErrors.password)}
            helperText={formErrors.password}
            onChange={handleChange}
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Button
            onClick={handleClick}
            fullWidth
            sx={{
              backgroundColor: 'black',
              '&:hover': { backgroundColor: 'crimson' },
            }}
          >
            <svg
              width='24'
              height='24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M2.04 12c0-5.523 4.476-10 10-10 5.522 0 10 4.477 10 10s-4.478 10-10 10c-5.524 0-10-4.477-10-10z'
                fill='#FC3F1D'
              />
              <path
                d='M13.32 7.666h-.924c-1.694 0-2.585.858-2.585 2.123 0 1.43.616 2.1 1.881 2.959l1.045.704-3.003 4.487H7.49l2.695-4.014c-1.55-1.111-2.42-2.19-2.42-4.015 0-2.288 1.595-3.85 4.62-3.85h3.003v11.868H13.32V7.666z'
                fill='#fff'
              />
            </svg>
          </Button>
          {status === 'failed' && (
            <Alert
              sx={{ mt: 1, mb: 2 }}
              severity='error'
              variant='outlined'
            >
              {error}
            </Alert>
          )}
          <Grid container>
            <Link
              href='registration'
              variant='body2'
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

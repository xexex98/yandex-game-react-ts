// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Alert,
  Box,
  Button,
  Container,
  // Avatar,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { validateAllFields, validateField } from '../../helpers/validate';
import { useAppDispatch, useAppSelector } from '../../store';
import { getCurrentUser, login } from '../../store/modules/auth/authSlice';

export type FormSignIn = {
  login: string;
  password: string;
};

type FormSignInErrors = Partial<FormSignIn>;

export const SignIn = () => {
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
};

export const initLoginPage = () => Promise.resolve();

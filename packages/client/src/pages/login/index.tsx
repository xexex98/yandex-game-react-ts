import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { validateAllFields, validateField } from '../../helpers/validate';
import { RootState, useAppDispatch } from '../../store';
import { login } from '../../store/modules/auth/authSlice';

export type FormSignIn = {
  login: string;
  password: string;
};

type FormSignInErrors = Partial<FormSignIn>;

export function SignIn() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status } = useSelector((state: RootState) => state.auth);

  const [formValues, setFormValues] = useState<FormSignIn>({
    login: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState<FormSignInErrors>({});

  useEffect(() => {
    if (status === 'success') {
      navigate('/profile');
    }
  }, [status, navigate]);

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
          <Grid container>
            <Grid
              item
              xs
            >
              <Link
                href='#'
                variant='body2'
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href='registration'
                variant='body2'
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

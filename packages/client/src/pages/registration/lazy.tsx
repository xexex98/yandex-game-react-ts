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
import { register } from '../../store/modules/auth/authSlice';

export type FormSignUp = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

type FormSignUpErrors = Partial<FormSignUp>;

export function SignUp() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);

  const [formValues, setFormValues] = useState<FormSignUp>({
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    password: '',
    phone: '',
  });

  const [formErrors, setFormErrors] = useState<FormSignUpErrors>({});

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
      await dispatch(register(formValues));
    }
  };

  return (
    <Container
      component='main'
      maxWidth='xs'
      sx={{ paddingTop: '10px' }}
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
          Sign up
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
          noValidate
        >
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                onBlur={handleBlur}
                value={formValues.first_name}
                error={Boolean(formErrors.first_name)}
                helperText={formErrors.first_name}
                onChange={handleChange}
                autoComplete='given-name'
                name='first_name'
                required
                fullWidth
                id='first_name'
                label='First Name'
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                onBlur={handleBlur}
                value={formValues.second_name}
                error={Boolean(formErrors.second_name)}
                helperText={formErrors.second_name}
                onChange={handleChange}
                required
                fullWidth
                id='second_name'
                label='Second Name'
                name='second_name'
                autoComplete='family-name'
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                onBlur={handleBlur}
                value={formValues.login}
                error={Boolean(formErrors.login)}
                helperText={formErrors.login}
                onChange={handleChange}
                required
                fullWidth
                id='login'
                label='Login'
                name='login'
                autoComplete='username'
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                onBlur={handleBlur}
                value={formValues.email}
                error={Boolean(formErrors.email)}
                helperText={formErrors.email}
                onChange={handleChange}
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                onBlur={handleBlur}
                value={formValues.password}
                error={Boolean(formErrors.password)}
                helperText={formErrors.password}
                onChange={handleChange}
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                onBlur={handleBlur}
                value={formValues.phone}
                error={Boolean(formErrors.phone)}
                helperText={formErrors.phone}
                onChange={handleChange}
                autoComplete='tel'
                name='phone'
                required
                fullWidth
                id='phone'
                label='Phone'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
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
          <Grid
            container
            justifyContent='flex-end'
          >
            <Grid item>
              <Link
                href='login'
                variant='body2'
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

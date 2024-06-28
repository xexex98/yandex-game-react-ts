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
import { useState } from 'react';

import { validateAllFields, validateField } from '../../helpers/validate';

type FormSignIn = {
  email: string;
  password: string;
};

type FormSignInErrors = {
  email?: string;
  password?: string;
};

export function SignIn(): JSX.Element {
  const [formValues, setFormValues] = useState<FormSignIn>({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState<FormSignInErrors>({});

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const validationErrors = validateAllFields(formValues);

    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.info({
        email: data.get('email'),
        password: data.get('password'),
      });
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
            value={formValues.email}
            error={Boolean(formErrors.email)}
            helperText={formErrors.email}
            onChange={handleChange}
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
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

import { Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useCallback, useRef, useState } from 'react';

import { PasswordModal } from '../../components/PasswordModal';

type TUserData = {
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
};

export const ProfilePage = () => {
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const UData: TUserData = {
    login: 'johny',
    firstName: 'John',
    lastName: 'Doe',
    email: 'example@mail.com',
    phone: '+79993332211',
    avatar:
      'https://gravatar.com/avatar/96286509b79a0ea10daedb7be8906143?s=400&d=robohash&r=x',
  };
  const [userData, setUserData] = useState(UData);
  const [avatarUrl, setAvatarUrl] = useState(userData.avatar);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const data = new FormData(e.currentTarget);

    // console.log('Profile submit', data);
  }, []);

  const handleChangeAvatar = useCallback(() => {
    if (!inputRef.current?.files?.length) {
      return;
    }
    const file = inputRef.current.files[0];

    setAvatarUrl(URL.createObjectURL(file));
  }, []);

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.currentTarget;
      const { name, value } = input;
      const data = { ...userData, [name]: value };

      setUserData(data);
    },
    [userData]
  );

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
        <Typography
          component='h1'
          variant='h5'
        >
          Profile
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <label>
                <input
                  ref={inputRef}
                  accept='image/*'
                  name='avatar'
                  type='file'
                  style={{ display: 'none' }}
                  onChange={handleChangeAvatar}
                />
                <Avatar
                  src={avatarUrl}
                  style={{
                    margin: '10px',
                    width: '100px',
                    height: '100px',
                    cursor: 'pointer',
                    backgroundColor: '#e3e3e3',
                  }}
                />
              </label>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                required
                fullWidth
                id='login'
                label='Login'
                name='login'
                autoComplete='Username'
                value={userData.login}
                onChange={handleChangeInput}
                autoFocus
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                autoComplete='First name'
                name='firstName'
                required
                fullWidth
                id='first_name'
                label='First Name'
                value={userData.firstName}
                onChange={handleChangeInput}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                required
                fullWidth
                id='second_name'
                label='Second Name'
                name='lastName'
                autoComplete='Second name'
                value={userData.lastName}
                onChange={handleChangeInput}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                required
                fullWidth
                id='email'
                label='Email'
                name='email'
                autoComplete='Email'
                value={userData.email}
                onChange={handleChangeInput}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                required
                fullWidth
                id='phone'
                label='Phone number'
                name='phone'
                autoComplete='Phone'
                value={userData.phone}
                onChange={handleChangeInput}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Button
                type='button'
                fullWidth
                onClick={() => setShowModal(true)}
              >
                Change password
              </Button>
            </Grid>
          </Grid>
        </Box>
        <PasswordModal
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </Box>
    </Container>
  );
};

import { Avatar } from '@mui/material';
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useRef, useState } from 'react';

type TUserData = {
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
};

const Profile = () => {
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

  const modalWrapStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'calc(100% - 60px)',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 20px 0 #00000040',
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const data = new FormData(e.currentTarget);

    // console.log('Profile submit', data);
  };

  const handlePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const data = new FormData(e.currentTarget);

    // console.log('Change password', data);
  };

  const handleChange = () => {
    if (!inputRef.current?.files) {
      return;
    }
    const file = inputRef.current.files[0];

    if (!file) {
      return;
    }

    setAvatarUrl(URL.createObjectURL(file));
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
                  onChange={handleChange}
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
                onChange={(e) =>
                  setUserData({ ...userData, login: e.currentTarget.value })
                }
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
                name='first_name'
                required
                fullWidth
                id='first_name'
                label='First Name'
                value={userData.firstName}
                onChange={(e) =>
                  setUserData({ ...userData, firstName: e.currentTarget.value })
                }
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
                name='second_name'
                autoComplete='Second name'
                value={userData.lastName}
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.currentTarget.value })
                }
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
                onChange={(e) =>
                  setUserData({ ...userData, email: e.currentTarget.value })
                }
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
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.currentTarget.value })
                }
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
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          aria-labelledby='modal-password'
          aria-describedby='modal-modal-description'
        >
          <Box
            component='form'
            sx={modalWrapStyle}
            onSubmit={handlePassword}
          >
            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                xs={12}
              >
                <Typography
                  id='modal-password'
                  variant='h6'
                  component='h2'
                  style={{ textAlign: 'center' }}
                >
                  Change password form
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  required
                  fullWidth
                  label='Old password'
                  name='old_password'
                ></TextField>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  required
                  fullWidth
                  label='New password'
                  name='new_password'
                ></TextField>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  required
                  fullWidth
                  label='Repeat new password'
                  name='repeat_password'
                ></TextField>
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
                  Change
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Box>
    </Container>
  );
};

export default Profile;

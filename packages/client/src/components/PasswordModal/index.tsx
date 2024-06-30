import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useCallback } from 'react';

type TProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PasswordModal = ({ showModal, setShowModal }: TProps) => {
  const handlePassword = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const data = new FormData(e.currentTarget);

    // console.log('Change password', data);
  }, []);

  const handleClick = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      const target = e.target;

      if (target?.getAttribute('data-role') === 'saver') {
        setShowModal(false);
      }
    },
    [setShowModal]
  );

  return (
    <Modal
      open={showModal}
      onClose={() => setShowModal(false)}
      aria-labelledby='modal-password'
      aria-describedby='modal-modal-description'
    >
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        sx={{
          height: '100%',
          padding: '0 30px 100px 30px',
        }}
        data-role='saver'
        onClick={handleClick}
      >
        <Box
          component='form'
          sx={{
            width: '100%',
            maxWidth: 400,
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 0 20px 0 #00000040',
          }}
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
                type='password'
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
                type='password'
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
                type='password'
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
      </Box>
    </Modal>
  );
};

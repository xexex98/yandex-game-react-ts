import AddCircle from '@mui/icons-material/AddCircle';
import Close from '@mui/icons-material/Close';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { FormEvent } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  display: 'flex',
  flexDirection: 'column',

  width: 400,
  padding: '32px 48px',
  borderRadius: '10px',

  bgcolor: 'background.paper',

  boxShadow: 24,

  p: 4,
};

export const AddTopic = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.info({
      title: data.get('title'),
      description: data.get('description'),
    });
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        endIcon={<AddCircle />}
      >
        Add Topic
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='h5'>Add Topic</Typography>
            <Close
              sx={{ cursor: 'pointer' }}
              onClick={handleClose}
            />
          </Box>
          <Box
            component='form'
            onSubmit={submit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: 2,
              gap: 2,
            }}
          >
            <TextField
              placeholder='Title'
              name='title'
            />
            <TextField
              placeholder='Description'
              multiline
              minRows='4'
              name='description'
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button type='submit'>add</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

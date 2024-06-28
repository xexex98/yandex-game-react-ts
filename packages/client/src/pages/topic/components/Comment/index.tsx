import MapsUgc from '@mui/icons-material/MapsUgc';
import { Box, Button, TextField } from '@mui/material';
import { FC, useState } from 'react';

type CommentProps = {
  sendComment: (value: string) => void;
};

export const Comment: FC<CommentProps> = ({ sendComment }) => {
  const [comment, setComment] = useState('');

  const send = () => {
    sendComment(comment);
    setComment('');
  };

  return (
    <Box
      component='form'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: '8px 12px',
        border: '1px solid #e7e7e9',
        borderRadius: 2,
      }}
    >
      <TextField
        placeholder='Write comment'
        multiline
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        minRows='4'
      />
      <Box
        component='div'
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          variant='contained'
          endIcon={<MapsUgc />}
          onClick={send}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

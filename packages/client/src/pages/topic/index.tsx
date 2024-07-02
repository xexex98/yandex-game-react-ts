import { Box, Container, Typography } from '@mui/material';

import { BackButton } from '../../components/BackButton';
import { Comment } from './components/Comment';
import { ListComment } from './components/ListComment';

export const TopicPage = () => {
  const sendComment = (value: string) => {
    console.info(value);
  };

  return (
    <Container
      component='main'
      maxWidth='xl'
    >
      <Typography
        component='h2'
        variant='h5'
        sx={{
          textAlign: 'center',
        }}
      >
        Topic
      </Typography>
      <BackButton href='/forum' />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          marginTop: 4,
        }}
      >
        <Comment sendComment={sendComment} />
        <ListComment />
      </Box>
    </Container>
  );
};

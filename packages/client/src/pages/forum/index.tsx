import { Box, Container, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { AddTopic } from './components/AddTopic';
import { ListTopic } from './components/ListTopic';

export const ForumPage = () => {
  const showForumPage = true;

  return (
    <Container
      component='main'
      maxWidth='xl'
    >
      {showForumPage && (
        <>
          <Typography
            component='h2'
            variant='h5'
            sx={{
              textAlign: 'center',
            }}
          >
            Forum
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 2,
            }}
          >
            <AddTopic />
          </Box>
          <ListTopic />
        </>
      )}
      <Outlet />
    </Container>
  );
};

export const initForumPage = () => Promise.resolve();

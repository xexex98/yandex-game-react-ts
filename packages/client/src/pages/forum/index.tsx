import { Box, Container, Link, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { TopicCard } from '../../components/TopicCard';
import { AddTopic } from './components/AddTopic';

export const ForumPage = () => {
  const topics = [
    {
      id: 1,
      title: 'Title topic',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 2,
      title: 'Title topic',
      shortDescription: 'short description topick',
      date: new Date(),
    },
    {
      id: 3,
      title: 'Title topic',
      shortDescription: 'short description topick',
      date: new Date(),
    },
  ];

  const showForumPage = !location.pathname.includes('forum/topic');

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
          <Box
            sx={{
              marginTop: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            {topics.map((card) => {
              return (
                <Link
                  href={`/forum/topic/${card.id}`}
                  key={card.id}
                  sx={{
                    width: '100%',
                  }}
                >
                  <TopicCard
                    card={{ ...card, content: card.shortDescription }}
                  />
                </Link>
              );
            })}
          </Box>
        </>
      )}
      <Outlet />
    </Container>
  );
};

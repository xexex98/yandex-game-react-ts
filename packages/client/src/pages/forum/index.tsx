import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Topic } from './components/Topic';

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
        Forum
      </Typography>
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
            <Topic
              key={card.id}
              card={card}
            />
          );
        })}
      </Box>
    </Container>
  );
};

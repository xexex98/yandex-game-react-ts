import { Box, Container, Typography } from '@mui/material';

import { TopicCard } from '../../components/TopicCard';

export const TopicPage = () => {
  const cards = [
    {
      id: 1,
      name: 'Иванонв Иван Иваныч',
      comment: '11111',
      rating: 3000,
      date: new Date(),
    },
    {
      id: 2,
      name: 'Иванонв Иван Иваныч',
      comment: '11111',
      rating: 3000,
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
        Topic
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          marginTop: 4,
        }}
      >
        {cards.map((card) => {
          return (
            <TopicCard
              card={{ ...card, content: card.comment, title: card.name }}
              key={card.id}
            />
          );
        })}
      </Box>
    </Container>
  );
};

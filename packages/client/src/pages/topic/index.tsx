import { Box, Container, Typography } from '@mui/material';

import { BackButton } from '../../components/BackButton';
import { TopicCard } from '../../components/TopicCard';
import { Comment } from './components/Comment';

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

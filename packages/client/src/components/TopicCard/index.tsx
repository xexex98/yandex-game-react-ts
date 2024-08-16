import 'dayjs/locale/ru';

import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { FC } from 'react';

export type Card = {
  id: number;
  title: string;
  rating?: number;
  content: string;
  date: Date | string;
  avatar?: string;
};

type TopicProps = {
  card: Card;
};

dayjs.locale('ru');
export const TopicCard: FC<TopicProps> = ({ card }) => {
  const transformDate = (date: Date) => {
    return dayjs(date).format('DD MMMM YYYY HH:mm');
  };

  return (
    <Card sx={{ display: 'flex', width: '100%' }}>
      <Box
        component='div'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: '12px',
          gap: '4px',
        }}
      >
        {card.avatar}
        <Avatar
          sx={{ m: 1, bgcolor: 'secondary.main' }}
          src={card.avatar}
          alt=''
        />
        {card?.rating && (
          <Typography
            component='h3'
            variant='caption'
            sx={{
              width: 'max-content',
            }}
          >
            Рейтинг: {card.rating}
          </Typography>
        )}
      </Box>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 1,
        }}
        style={{
          padding: '8px',
        }}
      >
        <Box component='div'>
          <Typography
            component='div'
            variant='subtitle1'
          >
            {card.title}
          </Typography>
          <Typography
            variant='subtitle2'
            component='h2'
          >
            {card.content}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
          }}
        >
          <Typography
            variant='caption'
            color='text.secondary'
            component='h4'
          >
            {card.date !== '' ? transformDate(card.date as Date) : null}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

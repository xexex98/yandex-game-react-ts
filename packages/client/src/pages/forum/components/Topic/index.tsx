import 'dayjs/locale/ru';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import React, { FC } from 'react';

type Card = {
  id: number;
  title: string;
  shortDescription: string;
  date: Date;
};
type TopicProps = {
  card: Card;
};
dayjs.locale('ru');
export const Topic: FC<TopicProps> = ({ card }) => {
  const transformDate = (date: Date) => {
    return dayjs(date).format('DD MMMM YYYY HH:mm');
  };

  return (
    <React.Fragment>
      <Card sx={{ display: 'flex', width: '100%', cursor: 'pointer' }}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
        </Box>
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            gap: 1.5,
          }}
        >
          <Box component='div'>
            <Typography
              component='div'
              variant='h5'
            >
              {card.title}
            </Typography>
            <Typography
              variant='subtitle1'
              color='text.secondary'
              component='h2'
            >
              {card.shortDescription}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              width: 120,
            }}
          >
            <Typography
              variant='caption'
              color='text.secondary'
              component='h4'
              sx={{
                width: 120,
              }}
            >
              {transformDate(card.date)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

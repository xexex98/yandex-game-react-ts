import { Avatar, Box, Typography } from '@mui/material';
import { FC } from 'react';

import { CardTop3UserProps } from '../types/CardProps';

const AVATAR_URL =
  'https://gravatar.com/avatar/96286509b79a0ea10daedb7be8906143?s=400&d=robohash&r=x';

export const CardTopUser: FC<CardTop3UserProps> = ({ card, position }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '4px 8px',
        gap: 2.5,
        background: '#5256D5',
        borderRadius: '30px',
        width: '100%',
        color: '#FFFEFD',
      }}
    >
      <Typography
        component='h4'
        sx={{
          position: 'absolute',
          top: '-6px',
          right: '5px',
          rotate: '20deg',
          color: '#F9D838',
        }}
      >
        {position}
      </Typography>
      <Avatar
        src={card.avatar ?? AVATAR_URL}
        sx={{
          backgroundColor: '#e3e3e3',
        }}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Typography
          component='h4'
          variant='subtitle2'
        >
          {card.login}
        </Typography>
        <Typography
          component='h4'
          variant='subtitle2'
        >
          {card.rating}
        </Typography>
      </Box>
    </Box>
  );
};

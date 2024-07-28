import { EmojiEvents } from '@mui/icons-material';
import { Avatar, Box, Typography } from '@mui/material';
import { FC } from 'react';

import { CardTop3UserProps } from '../types/CardProps';

const AVATAR_URL =
  'https://gravatar.com/avatar/96286509b79a0ea10daedb7be8906143?s=400&d=robohash&r=x';

export const CardTop3User: FC<CardTop3UserProps> = ({ position, card }) => {
  const procent = 1 - 0.25 * position;

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#FFFEFD',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        {position === 0 && (
          <EmojiEvents
            sx={{
              position: 'absolute',
              zIndex: 1,
              top: '5px',
              right: '-10px',
              width: '60px',
              height: '60px',
              color: '#F9D838',
            }}
          />
        )}

        <Avatar
          src={card.avatar ?? AVATAR_URL}
          sx={{
            width: 140 * procent,
            height: 140 * procent,
            marginBottom: 2,
            backgroundColor: '#e3e3e3',
          }}
        />
      </Box>
      <Typography
        component='h3'
        variant='h5'
        sx={{
          color: '#F9D838',
        }}
      >
        {card.login}
      </Typography>
      <Typography
        component='h3'
        variant={position === 0 ? 'h5' : 'subtitle1'}
        sx={{
          color: '#F9D838',
        }}
      >
        {card.rating}
      </Typography>
    </Box>
  );
};

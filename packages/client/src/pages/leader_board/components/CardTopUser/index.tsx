import { Avatar, Box, Typography } from '@mui/material';
import { FC } from 'react';

import { CardTop3UserProps } from '../types/CardProps';

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
        }}
      >
        {position}
      </Typography>
      <Avatar />

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

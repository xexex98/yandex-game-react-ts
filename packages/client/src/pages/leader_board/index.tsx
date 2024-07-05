import { Box, Container, Typography } from '@mui/material';

import { CardTop3User } from './components/CardTop3User';
import { CardTopUser } from './components/CardTopUser';

export const LeaderBoardPage = () => {
  const users = [
    {
      login: 'player',
      rating: 3000,
    },
    {
      login: 'player',
      rating: 3000,
    },
    {
      login: 'player',
      rating: 3000,
    },
    {
      login: 'player',
      rating: 3000,
    },
    {
      login: 'player',
      rating: 3000,
    },
    {
      login: 'player',
      rating: 3000,
    },
    {
      login: 'player',
      rating: 3000,
    },
    {
      login: 'player',
      rating: 3000,
    },
    {
      login: 'player',
      rating: 3000,
    },
    {
      login: 'player',
      rating: 3000,
    },
    {
      login: 'player',
      rating: 3000,
    },
    {
      login: 'player',
      rating: 3000,
    },
    {
      login: 'player',
      rating: 3000,
    },
  ];

  return (
    <Box
      sx={{
        background: '#2C2F35',
        height: '100vh',
        color: '#FFFEFD',
      }}
    >
      <Container
        component='main'
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <Typography
          component='h2'
          variant='h5'
          sx={{ textAlign: 'center', margin: '24px 0' }}
        >
          Leaderboard
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 140px)',
              alignItems: 'end',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            {users.slice(0, 3).map((card, index) => {
              return (
                <Box
                  key={index}
                  style={{
                    gridColumn: index === 0 ? '2/3' : '',
                    gridRow: 1,
                  }}
                >
                  <CardTop3User
                    position={index}
                    card={card}
                  />
                </Box>
              );
            })}
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 300px)',
              justifyContent: 'center',
              justifyItems: 'center',
              gap: 4,
              marginTop: 10,
            }}
          >
            {users.slice(3, 13).map((card, index) => {
              return (
                <CardTopUser
                  key={index}
                  card={card}
                  position={index + 4}
                />
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

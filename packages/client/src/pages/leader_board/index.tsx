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
  ];

  return (
    <Box
      sx={{
        background: 'linear-gradient(black, #20263c)',
      }}
    >
      <Container component='main'>
        <Typography
          component='h2'
          variant='h5'
          sx={{ textAlign: 'center', marginBottom: 8 }}
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
                    order: index === 0 ? 2 : index,
                  }}
                >
                  <CardTop3User
                    position={index}
                    card={card}
                  />
                </Box>
              );
            })}
            {users.length === 2 && <Box sx={{ order: 3 }} />}
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
            {users.slice(3).map((card, index) => {
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

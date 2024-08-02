import { Box, Container, Typography } from '@mui/material';
import { useEffect } from 'react';

import { BackButton } from '../../components/BackButton';
import { Loader } from '../../components/Loader';
import { useAppDispatch, useAppSelector } from '../../store';
import { getAllLeaderboard } from '../../store/modules/leaderboard/leaderboardSlice';
import { selectLeaderboard } from '../../store/modules/leaderboard/selectors';
import { CardTop3User } from './components/CardTop3User';
import { CardTopUser } from './components/CardTopUser';

export const LeaderBoardPage = () => {
  const { leaderboard, status } = useAppSelector(selectLeaderboard);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllLeaderboard());
  }, [dispatch]);

  if (status === 'loading') {
    return <Loader />;
  }

  return (
    <Box
      sx={{
        height: '100vh',
        color: '#FFFEFD',
      }}
    >
      <Container
        component='main'
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            justifyContent: 'center',
          }}
        >
          <BackButton
            href='/'
            style={{ position: 'absolute', left: 0 }}
          />
          <Typography
            component='h2'
            variant='h5'
            sx={{ textAlign: 'center', margin: '24px 0' }}
          >
            Leaderboard
          </Typography>
        </Box>

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
            {leaderboard.slice(0, 3).map((card, index) => {
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
            {leaderboard.slice(3, 13).map((card, index) => {
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

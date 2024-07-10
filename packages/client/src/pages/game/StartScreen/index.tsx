import { Box, Button } from '@mui/material';
import { FC, useEffect } from 'react';

import { useAppDispatch } from '../../../store';
import { newGame } from '../../../store/modules/gameState/gameStateSlice';

type Props = {
  changeStart: () => void;
};

export const StartScreen: FC<Props> = ({ changeStart }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(newGame());
  }, []);

  return (
    <Box
      height='100vh'
      bgcolor={'linear-gradient(black, #20263c)'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      sx={{
        background: 'linear-gradient(black, #20263c)',
      }}
    >
      <Button
        variant='contained'
        onClick={changeStart}
      >
        Начать игру
      </Button>
    </Box>
  );
};

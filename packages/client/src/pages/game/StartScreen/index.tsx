import { FC } from 'react'
import { Box, Button } from '@mui/material'

type Props = {
  changeStart: () => void
}

export const StartScreen: FC<Props> = ({ changeStart }) => {
  return (
    <Box
      height="100vh"
      bgcolor={'linear-gradient(black, #20263c)'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      sx={{
        background: 'linear-gradient(black, #20263c)',
      }}>
      <Button variant="contained" onClick={changeStart}>
        Начать игру
      </Button>
    </Box>
  )
}

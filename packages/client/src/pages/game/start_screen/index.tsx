import { Box, Button } from '@mui/material'
import React from 'react'

type Props = {
  setStart: React.Dispatch<React.SetStateAction<boolean>>
}

export const StartScreen = ({ setStart }: Props) => {
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
      <Button variant="contained" onClick={() => setStart(true)}>
        Начать игру
      </Button>
    </Box>
  )
}

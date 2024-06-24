import { useState } from 'react'
import { AuthButtons } from './auth_buttons'
import { GameButtons } from './game_buttons'
import { Box, Typography } from '@mui/material'

export const MainPage = () => {
  const [authorised, setAuthorised] = useState(false)

  return (
    <Box
      height={'100vh'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}>
      <Typography variant="h3" component="h1" marginBottom={'80px'}>
        Ludocoder's Clicker
      </Typography>
      {authorised ? <GameButtons /> : <AuthButtons />}
    </Box>
  )
}

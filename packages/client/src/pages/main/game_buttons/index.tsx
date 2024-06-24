import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import style from '../main.module.css'

export const GameButtons = () => {
  return (
    <Box
      width={'100%'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}>
      <Box width={360} display={'flex'} flexDirection={'column'}>
        <Link to="game" className={style.link}>
          <Button variant="contained" className={style.button}>
            Игра
          </Button>
        </Link>
        <Link to="forum" className={style.link}>
          <Button variant="contained" className={style.button}>
            Форум
          </Button>
        </Link>
        <Link to="profile" className={style.link}>
          <Button variant="contained" className={style.button}>
            Профиль
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

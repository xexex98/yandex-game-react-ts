import { Box, Link, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';

const primary = purple[500];

export const NotFound = () => {
  const linkStyle = {
    color: '#000',
    fontWeight: 500,
    padding: '10px 20px',
    borderRadius: '6px',
    backgroundColor: '#fff',
  };
  const boxStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: primary,
    backgroundImage: 'linear-gradient(0deg, #000, #341039)',
  };

  return (
    <Box sx={boxStyle}>
      <Typography
        variant='h1'
        style={{ color: 'white' }}
      >
        404
      </Typography>
      <Typography
        variant='h6'
        style={{ color: 'white' }}
      >
        Извините, страница не найдена.
      </Typography>
      <Link
        href='/'
        underline='none'
        variant='body2'
        sx={linkStyle}
      >
        На главную
      </Link>
    </Box>
  );
};

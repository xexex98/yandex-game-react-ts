import { Box, Link, Typography } from '@mui/material';

export const NotFound = () => {
  const linkStyle = {
    color: '#fff',
    fontWeight: 500,
    padding: '10px 20px',
    margin: '30px 0 0',
    borderRadius: '6px',
    backgroundColor: '#309bac',
  };
  const boxStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  return (
    <Box sx={boxStyle}>
      <Typography
        variant='h1'
        style={{ color: '#309bac' }}
      >
        404
      </Typography>
      <Typography
        variant='h6'
        style={{ color: '#309bac' }}
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

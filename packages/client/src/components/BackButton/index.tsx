import ArrowBack from '@mui/icons-material/ArrowBack';
import { Button, Link } from '@mui/material';
import { FC } from 'react';

type BackButtonPros = {
  href: string;
  style: React.CSSProperties | undefined;
};

export const BackButton: FC<BackButtonPros> = ({ href, style }) => {
  return (
    <Link
      href={href}
      style={style}
    >
      <Button
        variant='contained'
        startIcon={<ArrowBack />}
      >
        Back
      </Button>
    </Link>
  );
};

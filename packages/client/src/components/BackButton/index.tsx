import ArrowBack from '@mui/icons-material/ArrowBack';
import { Button, Link } from '@mui/material';
import { FC } from 'react';

type BackButtonPros = {
  href: string;
};

export const BackButton: FC<BackButtonPros> = ({ href }) => {
  return (
    <Link href={href}>
      <Button
        variant='contained'
        startIcon={<ArrowBack />}
      >
        Back
      </Button>
    </Link>
  );
};

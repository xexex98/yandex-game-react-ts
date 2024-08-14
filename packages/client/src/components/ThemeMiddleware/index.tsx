import { createTheme, ThemeProvider } from '@mui/material';
import { ThemeOptions } from '@mui/material';
import React, { ReactNode, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store';
import {
  selectTheme,
  toggleTheme as TT,
} from '../../store/modules/auth/authSlice';
import { ThemeToggleButton } from './ToggleButton';

const ludocodersLightTheme: ThemeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#19557b',
    },
    secondary: {
      main: '#25b189',
    },
  },
});

const ludocodersDarkTheme: ThemeOptions = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1d0925',
    },
    secondary: {
      main: '#c11e22',
    },
    background: {
      default: '#1c1c1c',
      paper: '#373737',
    },
  },
});

export const ThemeMiddleware: React.FC<{ children: ReactNode | undefined }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  const toggleTheme = () => {
    dispatch(TT());
  };

  useEffect(() => {
    console.info(`Change theme to ${theme}`);

    const root = document.getElementById('root') as HTMLDivElement;

    root.classList.remove('theme-light');
    root.classList.remove('theme-dark');
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeProvider
      theme={theme === 'light' ? ludocodersLightTheme : ludocodersDarkTheme}
    >
      <div className='theme-toggle-wrap'>
        <button
          onClick={toggleTheme}
          className='theme-toggle'
        >
          <ThemeToggleButton />
        </button>
      </div>
      {children}
    </ThemeProvider>
  );
};

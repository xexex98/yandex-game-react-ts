import { createTheme, ThemeProvider } from '@mui/material';
import { ThemeOptions } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { startServiceWorker } from '../services/serviceWorker/startServiceWorker';
import { ErrorBoundary } from './components/ErrorBoundary';
import routes from './routes';
import { store } from './store';

import './style.css';

const ludocodersTheme: ThemeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#19557b',
    },
    secondary: {
      main: '#25b189',
    },
  },
  typography: {
    h1: {
      fontFamily: 'Droid Serif',
    },
    h2: {
      fontFamily: 'Droid Serif',
    },
  },
});

const router = createBrowserRouter(routes);

startServiceWorker();

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider theme={ludocodersTheme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

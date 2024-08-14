import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { startServiceWorker } from '../services/serviceWorker/startServiceWorker';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeMiddleware } from './components/ThemeMiddleware';
import routes from './routes';
import { store } from './store';

import './style.css';

const router = createBrowserRouter(routes);

startServiceWorker();

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeMiddleware>
          <RouterProvider router={router} />
        </ThemeMiddleware>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

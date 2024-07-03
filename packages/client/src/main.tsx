import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { startServiceWorker } from '../services/serviceWorker/startServiceWorker'
import { ErrorBoundary } from './components/ErrorBoundary';
import routes from './routes';

const router = createBrowserRouter(routes);

startServiceWorker()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { startServiceWorker } from '../services/serviceWorker/startServiceWorker'
import { ErrorBoundary } from './components/ErrorBoundary';
import routes from './routes';
import { store } from './store';

import './style.css';

const router = createBrowserRouter(routes);

startServiceWorker()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

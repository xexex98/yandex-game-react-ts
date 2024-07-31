import { configureStore } from '@reduxjs/toolkit';
import { Request as ExpressRequest } from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server';

import { createFetchRequest } from './entry-server.utils';
import routes from './routes';
import { rootReducer } from './store';
import { getCurrentUser } from './store/modules/auth/authSlice';

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routes);
  const fetchRequest = createFetchRequest(req);
  const context = await query(fetchRequest);

  if (context instanceof Response) {
    throw context;
  }

  const store = configureStore({
    reducer: rootReducer,
  });

  const router = createStaticRouter(dataRoutes, context);

  await store.dispatch(getCurrentUser());

  return {
    // html: ReactDOM.renderToString(<Provider store={store}><App /></Provider>),
    html: ReactDOM.renderToString(
      <Provider store={store}>
        <StaticRouterProvider
          router={router}
          context={context}
        />
      </Provider>
    ),
    initialState: store.getState(),
  };
};

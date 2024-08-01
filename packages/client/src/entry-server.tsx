import { configureStore } from '@reduxjs/toolkit';
import { Request as ExpressRequest } from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { matchRoutes } from 'react-router-dom';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server';

import {
  createContext,
  createFetchRequest,
  createUrl,
} from './entry-server.utils';
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

  const url = createUrl(req);

  const foundRoutes = matchRoutes(routes, url);

  if (!foundRoutes) {
    throw new Error('Page not found');
  }

  const [
    {
      route: { fetchData },
    },
  ] = foundRoutes;

  try {
    await fetchData({
      dispatch: store.dispatch,
      state: store.getState(),
      ctx: createContext(req),
    });
  } catch (e) {
    console.error('Error with page init', e);
  }

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

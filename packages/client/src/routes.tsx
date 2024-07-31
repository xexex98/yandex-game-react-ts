import { ComponentType } from 'react';
import { RouteObject } from 'react-router-dom';

import { ErrorBoundary } from './components/ErrorBoundary';
import { PrivateRoute } from './components/PrivateRoute';
//import { ErrorPage } from './pages/error';
import { ForumPage } from './pages/forum';
import { GamePage } from './pages/game';
import { LeaderBoardPage } from './pages/leader_board';
import { SignIn } from './pages/login';
import { MainPage } from './pages/main';
import { NotFound } from './pages/NotFound';
import { ProfilePage } from './pages/profile';
import { LazySignUp } from './pages/registration';
import { TopicPage } from './pages/topic';

const MyErrorBoundary = { ErrorBoundary } as unknown as ComponentType;

const routes: RouteObject[] = [
  {
    path: '*',
    Component: NotFound,
  },
  {
    path: '/',
    Component: MainPage,
    //errorElement: <ErrorPage />,
    ErrorBoundary: MyErrorBoundary,
  },
  {
    path: 'login',
    Component: SignIn,
    //errorElement: <ErrorPage />,
    ErrorBoundary: MyErrorBoundary,
  },
  {
    path: 'registration',
    Component: LazySignUp,
    ErrorBoundary: MyErrorBoundary,
  },
  {
    Component: PrivateRoute,
    children: [
      {
        path: 'profile',
        Component: ProfilePage,
        ErrorBoundary: MyErrorBoundary,
      },
      {
        path: 'game',
        Component: GamePage,
        ErrorBoundary: MyErrorBoundary,
      },
      {
        path: 'leaders',
        Component: LeaderBoardPage,
        ErrorBoundary: MyErrorBoundary,
      },
      {
        path: 'forum',
        Component: ForumPage,
        ErrorBoundary: MyErrorBoundary,
        children: [
          {
            path: 'topic/:id',
            Component: TopicPage,
          },
        ],
      },
    ],
  },
];

export default routes;

import { ComponentType } from 'react';
import { RouteObject } from 'react-router-dom';

import { ErrorBoundary } from './components/ErrorBoundary';
import { PrivateRoute } from './components/PrivateRoute';
import { ErrorPage } from './pages/error';
import { ForumPage } from './pages/forum';
import { GamePage } from './pages/game';
import { LeaderBoardPage } from './pages/leader_board';
import { SignIn } from './pages/login';
import { MainPage } from './pages/main';
import { NotFound } from './pages/notFound';
import { ProfilePage } from './pages/profile';
import { LazySignUp } from './pages/registration';
import { TopicPage } from './pages/topic';

const MyErrorBoundary = { ErrorBoundary } as unknown as ComponentType;

const routes: RouteObject[] = [
  { path: '*', element: <NotFound /> },
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
    ErrorBoundary: MyErrorBoundary,
  },
  {
    path: 'login',
    element: <SignIn />,
    ErrorBoundary: MyErrorBoundary,
  },
  {
    path: 'registration',
    element: <LazySignUp />,
    ErrorBoundary: MyErrorBoundary,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: 'profile',
        element: <ProfilePage />,
        ErrorBoundary: MyErrorBoundary,
      },
      {
        path: 'game',
        element: <GamePage />,
        ErrorBoundary: MyErrorBoundary,
      },
      {
        path: 'leaders',
        element: <LeaderBoardPage />,
        ErrorBoundary: MyErrorBoundary,
      },
      {
        path: 'forum',
        element: <ForumPage />,
        ErrorBoundary: MyErrorBoundary,
        children: [
          {
            path: 'topic/:id',
            element: <TopicPage />,
          },
        ],
      },
    ],
  },
];

export default routes;

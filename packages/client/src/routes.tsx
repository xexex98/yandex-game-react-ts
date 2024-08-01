import { ComponentType } from 'react';

//import { RouteObject } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { initPrivateRoutePage, PrivateRoute } from './components/PrivateRoute';
import { CustomRouteObject } from './consts';
//import { ErrorPage } from './pages/error';
import { ForumPage } from './pages/forum';
import { GamePage } from './pages/game';
import { LeaderBoardPage } from './pages/leader_board';
import { initLoginPage, SignIn } from './pages/login';
import { initMainPage, MainPage } from './pages/main';
import { initNotFoundPage, NotFound } from './pages/NotFound';
import { ProfilePage } from './pages/profile';
import { LazySignUp } from './pages/registration';
import { initRegistrationPage } from './pages/registration/lazy';
import { TopicPage } from './pages/topic';
import { AppDispatch, RootState } from './store';

export type PageInitContext = {
  clientToken?: string;
};

export type PageInitArgs = {
  dispatch: AppDispatch;
  state: RootState;
  ctx?: PageInitContext;
};

const MyErrorBoundary = { ErrorBoundary } as unknown as ComponentType;

//const routes: RouteObject[] = [
const routes: CustomRouteObject[] = [
  {
    path: '*',
    Component: NotFound,
    fetchData: initNotFoundPage,
  },
  {
    path: '/',
    Component: MainPage,
    //errorElement: <ErrorPage />,
    ErrorBoundary: MyErrorBoundary,
    fetchData: initMainPage,
  },
  {
    path: 'login',
    Component: SignIn,
    //errorElement: <ErrorPage />,
    ErrorBoundary: MyErrorBoundary,
    fetchData: initLoginPage,
  },
  {
    path: 'registration',
    Component: LazySignUp,
    ErrorBoundary: MyErrorBoundary,
    fetchData: initRegistrationPage,
  },
  {
    Component: PrivateRoute,
    fetchData: initPrivateRoutePage,
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

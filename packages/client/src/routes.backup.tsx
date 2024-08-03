//import { ComponentType } from 'react';
import { RouteObject } from 'react-router-dom';

//import { ErrorBoundary } from './components/ErrorBoundary';
import { PrivateRoute } from './components/PrivateRoute';
import { ErrorPage } from './pages/error';
import { ForumPage } from './pages/forum';
import { GamePage } from './pages/game';
import { LeaderBoardPage } from './pages/leader_board';
import { SignIn } from './pages/login';
import { MainPage } from './pages/main';
import { NotFound } from './pages/NotFound';
import { ProfilePage } from './pages/profile';
import { LazySignUp } from './pages/registration';
import { TopicPage } from './pages/topic';

//const MyErrorBoundary = { ErrorBoundary } as unknown as ComponentType;

const routes: RouteObject[] = [
  {
    path: '*',
    //element: <NotFound />,
    Component: NotFound,
  },
  {
    path: '/',
    //element: <MainPage />,
    Component: MainPage,
    errorElement: <ErrorPage />,
    //ErrorBoundary: MyErrorBoundary,
  },
  {
    path: 'login',
    //element: <SignIn />,
    Component: SignIn,
    //ErrorBoundary: MyErrorBoundary,
  },
  {
    path: 'registration',
    //element: <LazySignUp />,
    Component: LazySignUp,
    //ErrorBoundary: MyErrorBoundary,
  },
  {
    //element: <PrivateRoute />,
    Component: PrivateRoute,
    children: [
      {
        path: 'profile',
        //element: <ProfilePage />,
        Component: ProfilePage,
        //ErrorBoundary: MyErrorBoundary,
      },
      {
        path: 'game',
        //element: <GamePage />,
        Component: GamePage,
        //ErrorBoundary: MyErrorBoundary,
      },
      {
        path: 'leaders',
        //element: <LeaderBoardPage />,
        Component: LeaderBoardPage,
        //ErrorBoundary: MyErrorBoundary,
      },
      {
        path: 'forum',
        //element: <ForumPage />,
        Component: ForumPage,
        //ErrorBoundary: MyErrorBoundary,
        children: [
          {
            path: 'topic/:id',
            //element: <TopicPage />,
            Component: TopicPage,
          },
        ],
      },
    ],
  },
];

export default routes;

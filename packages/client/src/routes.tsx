import { RouteObject } from 'react-router-dom';

import { ErrorPage } from './pages/error';
import { ForumPage } from './pages/forum';
import { GamePage } from './pages/game';
import { LeaderBoardPage } from './pages/leader_board';
import { SignIn } from './pages/login';
import { MainPage } from './pages/main';
import { ProfilePage } from './pages/profile';
import { RegistrationPage } from './pages/registration';
import { TopicPage } from './pages/topic';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'login',
    element: <SignIn />,
  },
  {
    path: 'registration',
    element: <RegistrationPage />,
  },
  {
    path: 'profile',
    element: <ProfilePage />,
  },
  {
    path: 'forum',
    element: <ForumPage />,
    children: [
      {
        path: 'topic',
        element: <TopicPage />,
      },
    ],
  },
  {
    path: 'game',
    element: <GamePage />,
  },
  {
    path: 'leaders',
    element: <LeaderBoardPage />,
  },
];

export default routes;

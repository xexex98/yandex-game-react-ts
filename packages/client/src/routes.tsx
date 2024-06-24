import { ComponentType } from 'react'
import { LoginPage } from './pages/login'
import { MainPage } from './pages/main'
import { RegistrationPage } from './pages/registration'
import { ProfilePage } from './pages/profile'
import { ForumPage } from './pages/forum'
import { GamePage } from './pages/game'
import { TopicPage } from './pages/topic'
import { LeaderBoardPage } from './pages/leader_board'
import { ErrorPage } from './pages/error'
import { RouteObject } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'

const MyErrorBoundary = { ErrorBoundary } as unknown as ComponentType

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
    ErrorBoundary: MyErrorBoundary,
  },
  {
    path: 'login',
    element: <LoginPage />,
    ErrorBoundary: MyErrorBoundary,
  },
  {
    path: 'registration',
    element: <RegistrationPage />,
    ErrorBoundary: MyErrorBoundary,
  },
  {
    path: 'profile',
    element: <ProfilePage />,
    ErrorBoundary: MyErrorBoundary,
  },
  {
    path: 'forum',
    element: <ForumPage />,
    ErrorBoundary: MyErrorBoundary,
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
    ErrorBoundary: MyErrorBoundary,
  },
  {
    path: 'leaders',
    element: <LeaderBoardPage />,
    ErrorBoundary: MyErrorBoundary,
  },
]

export default routes

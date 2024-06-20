import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'
import { LoginPage } from './pages/login'
import { MainPage } from './pages/main'
import { RegistrationPage } from './pages/registration'
import { ProfilePage } from './pages/profile'
import { ForumPage } from './pages/forum'
import { GamePage } from './pages/game'
import { TopicPage } from './pages/topic'
import { LeaderBoardPage } from './pages/leader_board'
import { ErrorPage } from './pages/error'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'login',
    element: <LoginPage />,
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
]

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

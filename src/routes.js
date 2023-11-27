import { Navigate } from 'react-router-dom'
import AboutMe from './pages/AboutMe'
import Auth from './pages/Auth'
import Instructions from './pages/Instructions'
import Settings from './pages/Settings'
import Statistics from './pages/Statistics'

import {
  ABOUT_ROUTE,
  AUTH_ROUTE,
  INSTRUCTIONS_ROUTE,
  SETTINGS_ROUTE,
  STATISTICS_ROUTE,
} from './utils/consts'

export const publicRoutes = [
  {
    path: SETTINGS_ROUTE,
    element: <Settings />,
  },
  {
    path: STATISTICS_ROUTE,
    element: <Statistics />,
  },
  {
    path: INSTRUCTIONS_ROUTE,
    element: <Instructions />,
  },
  {
    path: ABOUT_ROUTE,
    element: <AboutMe />,
  },
  { path: '*', element: <Navigate to={SETTINGS_ROUTE} />, exact: true },
]
export const notAuthRoutes = [
  {
    path: AUTH_ROUTE,
    element: <Auth />,
    exact: true,
  },
  { path: '*', element: <Navigate to={AUTH_ROUTE} />, exact: true },
]

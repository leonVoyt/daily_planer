import AboutMe from './pages/AboutMe'
import Auth from './pages/Auth'
import Instructions from './pages/Instructions'
import Settings from './pages/Settings'
import Statistics from './pages/Statistics'

import { Navigate } from 'react-router-dom'
import {
  ABOUT_ROUTE,
  AUTH_ROUTE,
  INSTRUCTIONS_ROUTE,
  SETTINGS_ROUTE,
  STATISTICS_ROUTE,
} from './utils/consts'
import BookDetails from './components/BookDetails'

export const publicRoutes = [
  {
    path: AUTH_ROUTE,
    element: <Auth />,
    exact: true,
  },
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
  {
    path: '/:id',
    element: <BookDetails />,
  },
  //   { path: '*', element: <Navigate to={AUTH_ROUTE} />, exact: true },
]

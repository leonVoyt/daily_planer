import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { notAuthRoutes, publicRoutes } from '../routes'
import { inject, observer } from 'mobx-react'
const AppRouter = inject('budget')(
  observer(({ budget: { auth } }) => {
    return (
      <Routes>
        {auth.isAuth
          ? publicRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} exact />
            ))
          : notAuthRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} exact />
            ))}
      </Routes>
    )
  })
)
export default AppRouter

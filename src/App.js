import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import { inject, observer } from 'mobx-react'

const App = inject('budget')(
  observer(({ budget: { auth } }) => {
    return (
      <BrowserRouter>
        <section className="min-h-screen ">
          {auth.isAuth && <NavBar />}
          <AppRouter />
        </section>
      </BrowserRouter>
    )
  })
)

export default App

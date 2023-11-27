import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import {
  ABOUT_ROUTE,
  INSTRUCTIONS_ROUTE,
  SETTINGS_ROUTE,
  STATISTICS_ROUTE,
} from '../utils/consts'

const NavBar = inject('budget')(
  observer(({ budget: { auth } }) => {
    const history = useNavigate()
    const location = useLocation()

    return (
      <nav className="flex min-w-screen justify-between px-5 bg-blue-600 h-14 items-center text-white fixed w-screen">
        <div className="flex space-x-4">
          {pagesToNavbar.map((page) => (
            <button
              key={page.id}
              onClick={() => history(page.route)}
              className={`hover:text-gray-300 focus:outline-none border-b-4 border-transparent hover:border-white  ${
                location.pathname === page.route ? ' text-xl font-bold' : ''
              }`}
            >
              {page.name}
            </button>
          ))}
        </div>
        <button
          onClick={auth.logOut}
          className="bg-white text-black rounded-full px-4 py-2 hover:opacity-80 focus:outline-none"
        >
          Logout
        </button>
      </nav>
    )
  })
)

export default NavBar

const pagesToNavbar = [
  {
    id: 0,
    name: 'Create Monthly Post',
    route: SETTINGS_ROUTE,
  },
  {
    id: 1,
    name: 'Statistics',
    route: STATISTICS_ROUTE,
  },
  {
    id: 2,
    name: 'Instructions',
    route: INSTRUCTIONS_ROUTE,
  },
  {
    id: 3,
    name: 'About Me',
    route: ABOUT_ROUTE,
  },
]

import React from 'react'
import { publicRoutes } from '../routes'
import { useNavigate } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

const NavBar = inject('budget')(
  observer(({ budget: { auth } }) => {
    const history = useNavigate()
    return (
      <div className="flex min-w-screen justify-between px-5 bg-blue-600 h-14 items-center text-white">
        <div>
          {publicRoutes.map(({ path, element }) => (
            <button key={path} onClick={() => history(path)}>
              {path}
            </button>
          ))}
        </div>
        <button
          onClick={auth.logOut}
          className="bg-white text-black rounded-full px-3 py-1"
        >
          Logout
        </button>
      </div>
    )
  })
)

export default NavBar

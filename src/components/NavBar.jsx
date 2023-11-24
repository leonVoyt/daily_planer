import React from 'react'
import { publicRoutes } from '../routes'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
  const history = useNavigate()
  return (
    <div>
      {publicRoutes.map(({ path, element }) => (
        <button key={path} onClick={() => history(path)}>
          {path}
        </button>
      ))}
    </div>
  )
}

export default NavBar

import React, { useEffect } from 'react'
import { getCurrency } from '../API/currency'

const Auth = () => {
  useEffect(() => {
    getCurrency().then((data) => console.log(data))
  }, [])

  return <div>Auth</div>
}

export default Auth

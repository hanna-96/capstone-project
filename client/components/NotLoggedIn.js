import React from 'react'
import { Redirect } from 'react-router-dom'

const NotLoggedIn = () => {
  return <Redirect to='login' />
}

export default NotLoggedIn
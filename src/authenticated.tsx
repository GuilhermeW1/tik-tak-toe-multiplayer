import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './screens/home/home'
import Room from './screens/room/room'

//import { useAuth } from './context/auth-provider'

function AuthenticatedApp() {
  //const { user, logout } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rooms/:id" element={<Room />} />
    </Routes>
  )
}

export default AuthenticatedApp

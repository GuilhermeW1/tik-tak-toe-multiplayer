import React from 'react'
import './styles/main.css'
import { useAuth } from './context/auth-provider'

import UnauthenticatedApp from './unauthenticated'
import AuthenticatedApp from './authenticated'

function App() {
  const { user } = useAuth()

  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export default App

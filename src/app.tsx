import React from 'react'
import './styles/main.css'
import { useAuth } from './context/auth-provider'

import UnauthenticatedApp from './unauthenticated'
import AuthenticatedApp from './authenticated'

// const UnauthentictedApp = React.lazy(() => import('./unauthenticated'))

// const AuthenticatedApp = React.lazy(
//   () => import(/* webpackPrefetch: true */ './authenticated'),
// )

function App() {
  const { user } = useAuth()

  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export default App

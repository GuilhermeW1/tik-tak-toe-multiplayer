import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { AuthProvider } from './auth-provider'

interface AppProvider {
  children: React.ReactNode
}

function AppProviders(props: AppProvider) {
  return (
    <Router>
      <AuthProvider>{props.children}</AuthProvider>
    </Router>
  )
}

export default AppProviders

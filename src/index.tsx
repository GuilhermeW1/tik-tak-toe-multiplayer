import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import AppProviders from './context'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
)

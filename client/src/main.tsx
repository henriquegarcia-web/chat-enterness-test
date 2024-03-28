import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'

import '@/utils/styles/globals.css'
import '@/utils/styles/common.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

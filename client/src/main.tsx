import React from 'react'
import ReactDOM from 'react-dom/client'

import GlobalStyle from './utils/styles/globals.ts'
import App from './App.tsx'

import '@/utils/styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
)

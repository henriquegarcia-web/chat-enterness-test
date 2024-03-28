import React from 'react'
import ReactDOM from 'react-dom/client'

import '@/utils/styles/globals.css'
import '@/utils/styles/common.css'

import App from './App.tsx'
import { Toaster } from './components/ui/toaster.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>
)

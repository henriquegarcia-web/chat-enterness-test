import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { ChatLanding, ChatInput, Chat, NotFound } from './pages'

import { useAuth } from './contexts/AuthContext'

const AppRoutes = () => {
  const { isUserLogged } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        {/* =============================================================== */}

        <Route path="/" element={<ChatLanding />} />
        <Route path="/*" element={<Navigate to="/" />} />

        {/* =============================================================== */}

        <Route
          path="/entrar"
          element={
            <PublicRoute isAuthenticated={isUserLogged}>
              <ChatInput />
            </PublicRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <PrivateAdminRoute isAuthenticated={isUserLogged}>
              <Chat />
            </PrivateAdminRoute>
          }
        />

        {/* =============================================================== */}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

// =========================================== ROUTES

interface RouteProps {
  isAuthenticated: boolean
  children: React.ReactNode
}

const PrivateAdminRoute = ({ isAuthenticated, children }: RouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/entrar" replace />
  }

  return children
}

const PublicRoute = ({ isAuthenticated, children }: RouteProps) => {
  if (isAuthenticated) {
    return <Navigate to="/chat" />
  }

  return children
}

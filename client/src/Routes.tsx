import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { ChatLandingPage, ChatInputPage, ChatPage, NotFoundPage } from './pages'

import { useAuth } from './contexts/AuthContext'

const AppRoutes = () => {
  const { isUserLogged } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        {/* =============================================================== */}

        <Route path="/" element={<ChatLandingPage />} />
        <Route path="/*" element={<Navigate to="/" />} />

        {/* =============================================================== */}

        <Route
          path="/entrar"
          element={
            <PublicRoute isAuthenticated={isUserLogged}>
              <ChatInputPage />
            </PublicRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <PrivateAdminRoute isAuthenticated={isUserLogged}>
              <ChatPage />
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

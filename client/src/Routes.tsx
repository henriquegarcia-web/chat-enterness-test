import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import {
  ChatLandingPage,
  ChatISigninPage,
  ChatISignupPage,
  ChatPage,
  NotFoundPage
} from './pages'

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
              <ChatISigninPage />
            </PublicRoute>
          }
        />
        <Route
          path="/cadastrar"
          element={
            <PublicRoute isAuthenticated={isUserLogged}>
              <ChatISignupPage />
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

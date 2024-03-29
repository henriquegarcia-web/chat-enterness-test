/* eslint-disable @typescript-eslint/no-explicit-any */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import { api } from '@/api'

interface AuthContextData {
  userId: string | null
  isUserLogged: boolean
  handleLogout: () => void
}

// ===================================================================

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // =================================================================

  const [userId, setUserId] = useState<string | null>(null)

  const isUserLogged = useMemo(() => {
    return !!userId
  }, [userId])

  // =================================================================

  const verifyToken = async () => {
    const userToken = localStorage.getItem('user_token')

    await api
      .get('/verify-token', {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      .then((response) => {
        setUserId(response.data.userId || null)
      })
      .catch(() => {
        setUserId(null)
      })
  }

  useEffect(() => {
    verifyToken()
  }, [])

  const handleLogout = () => {
    setUserId(null)
    localStorage.removeItem('user_token')
  }

  const AuthContextValues = useMemo(() => {
    return {
      userId,
      isUserLogged,
      handleLogout
    }
  }, [userId, isUserLogged])

  return (
    <AuthContext.Provider value={AuthContextValues}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) throw new Error('useAuth must be used within a UserProvider')

  return context
}

export { AuthProvider, useAuth }

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
  isUserLogged: boolean
  handleLogout: () => void
}

// ===================================================================

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // =================================================================

  const [isUserLogged, setIsUserLogged] = useState<boolean>(false)

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
        setIsUserLogged(response.status === 200)
      })
      .catch(() => {})
  }

  useEffect(() => {
    verifyToken()
  }, [])

  const handleLogout = () => {
    setIsUserLogged(false)
    localStorage.removeItem('user_token')
  }

  const AuthContextValues = useMemo(() => {
    return {
      isUserLogged,
      handleLogout
    }
  }, [isUserLogged])

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

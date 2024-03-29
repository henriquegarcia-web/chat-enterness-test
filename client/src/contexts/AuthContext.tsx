/* eslint-disable @typescript-eslint/no-explicit-any */

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import { api } from '@/api'

import { IAuthContextData, IUserInfos } from '@/@types/contexts'

// ===================================================================

export const AuthContext = createContext<IAuthContextData>(
  {} as IAuthContextData
)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // =================================================================

  const [userId, setUserId] = useState<string | null>(null)
  const [userInfos, setUserInfos] = useState<IUserInfos | null>(null)

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
        setUserId(response.data.userNick || null)
        setUserInfos(response.data || null)
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
      userInfos,
      isUserLogged,
      handleLogout
    }
  }, [userId, userInfos, isUserLogged])

  return (
    <AuthContext.Provider value={AuthContextValues}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext)

  if (!context) throw new Error('useAuth must be used within a UserProvider')

  return context
}

export { AuthProvider, useAuth }

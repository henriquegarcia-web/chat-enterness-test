/* eslint-disable @typescript-eslint/no-explicit-any */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import api from '@/api'

interface AuthContextData {
  isUserLogged: boolean
}

// ===================================================================

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // =================================================================

  const isUserLogged = useMemo(() => {
    return true
  }, [])

  // =================================================================

  // useEffect(() => {
  //   console.log('LOGADO ======>', isUserLogged, userId)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isUserLogged])

  const AuthContextValues = useMemo(() => {
    return {
      isUserLogged
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

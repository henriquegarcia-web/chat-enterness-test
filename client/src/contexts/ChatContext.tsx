import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

interface ChatContextData {
  userId: string | null
}

// ===================================================================

export const ChatContext = createContext<ChatContextData>({} as ChatContextData)

const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  // =================================================================

  const [userId, setUserId] = useState<string | null>(null)

  // =================================================================

  // useEffect(() => {
  //   console.log('LOGADO ======>', isAdminLogged, userId)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isAdminLogged])

  const ChatContextValues = useMemo(() => {
    return {
      userId
    }
  }, [userId])

  return (
    <ChatContext.Provider value={ChatContextValues}>
      {children}
    </ChatContext.Provider>
  )
}

function useChat(): ChatContextData {
  const context = useContext(ChatContext)

  if (!context) throw new Error('useChat must be used within a UserProvider')

  return context
}

export { ChatProvider, useChat }

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import { useAuth } from './AuthContext'

import { createRoom } from '@/lib/socket'

interface ChatContextData {
  userId: string | null
  handleCreateRoom: ({ roomName }: { roomName: string }) => Promise<void>
}

// ===================================================================

export const ChatContext = createContext<ChatContextData>({} as ChatContextData)

const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  // =================================================================

  const { userId } = useAuth()

  useEffect(() => {
    console.log(userId)
  }, [userId])

  const handleCreateRoom = useCallback(
    async ({ roomName }: { roomName: string }) => {
      try {
        if (!userId) return

        const createRoomResponse = await createRoom({
          roomName,
          createdBy: userId
        })

        console.log(createRoomResponse)
      } catch (error) {
        console.log(error)
      }
    },
    [userId]
  )

  // =================================================================

  // useEffect(() => {
  //   console.log('LOGADO ======>', isAdminLogged, userId)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isAdminLogged])

  const ChatContextValues = useMemo(() => {
    return {
      userId,
      handleCreateRoom
    }
  }, [userId, handleCreateRoom])

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

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import { useAuth } from './AuthContext'

import { createRoom, entryRoom, sendMessage, useSocket } from '@/lib/socket'

import { IChatContextData, IMessage, IRoom } from '@/@types/contexts'
import { api } from '@/api'

// ===================================================================

export const ChatContext = createContext<IChatContextData>(
  {} as IChatContextData
)

const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  // =================================================================
  const socket = useSocket()
  const { userId } = useAuth()

  const [rooms, setRooms] = useState<IRoom[]>([])
  const [messages, setMessages] = useState<IMessage[]>([])
  const [currentRoom, setCurrentRoom] = useState<IRoom | null>(null)

  // =================================================================

  useEffect(() => {
    if (socket) {
      socket.connect()
      return () => {
        socket.disconnect()
      }
    }
  }, [socket])

  useEffect(() => {
    if (!userId || !socket) return

    const getRooms = async () => {
      try {
        const response = await api.get('/rooms')
        const data = response.data
        setRooms(data)
      } catch (error) {
        console.error('Erro ao buscar salas:', error)
      }
    }

    getRooms()

    socket.on('updateRooms', (updatedRooms) => {
      setRooms(updatedRooms)
    })

    return () => {
      socket.off('updateRooms')
    }
  }, [socket, userId])

  useEffect(() => {
    if (!currentRoom || !socket) return

    const getMessages = async () => {
      try {
        const response = await api.post('/messages', {
          roomId: currentRoom.roomId
        })
        const data = response.data
        setMessages(data)
      } catch (error) {
        console.error('Erro ao buscar mensagens:', error)
      }
    }

    getMessages()

    socket.on('newMesssage', (newMessage) => {
      if (newMessage.messageRoom === currentRoom.roomId) {
        setMessages((prevMessages) => [...prevMessages, newMessage])
      }
    })

    return () => {
      socket.off('newMesssage')
    }
  }, [socket, currentRoom])

  // =================================================================

  const handleCreateRoom = useCallback(
    async ({ roomName }: { roomName: string }) => {
      try {
        if (!userId) return false

        await createRoom(socket, {
          roomName,
          createdBy: userId
        })

        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    [socket, userId]
  )

  const handleEntryRoom = useCallback(
    async (room: IRoom) => {
      try {
        await entryRoom(socket, { roomId: room.roomId })
        setCurrentRoom(room)
      } catch (error) {
        console.log(error)
      }
    },
    [socket]
  )

  const handleSendMessage = useCallback(
    async (message: string) => {
      try {
        if (!currentRoom || !userId) return false

        await sendMessage(socket, {
          roomId: currentRoom.roomId,
          userId,
          message
        })
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    [socket, currentRoom, userId]
  )

  // =================================================================

  const ChatContextValues = useMemo(() => {
    return {
      userId,
      rooms,
      messages,
      currentRoom,
      handleCreateRoom,
      handleEntryRoom,
      handleSendMessage
    }
  }, [
    userId,
    rooms,
    messages,
    currentRoom,
    handleCreateRoom,
    handleEntryRoom,
    handleSendMessage
  ])

  return (
    <ChatContext.Provider value={ChatContextValues}>
      {children}
    </ChatContext.Provider>
  )
}

function useChat(): IChatContextData {
  const context = useContext(ChatContext)

  if (!context) throw new Error('useChat must be used within a UserProvider')

  return context
}

export { ChatProvider, useChat }

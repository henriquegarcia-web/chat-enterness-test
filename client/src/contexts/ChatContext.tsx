import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import io from 'socket.io-client'
// const socket = io(import.meta.env.VITE_SERVER_URL)

import { useAuth } from './AuthContext'

import { createRoom, entryRoom, sendMessage, useSocket } from '@/lib/socket'

import { ChatContextData, Message, Room } from '@/@types/contexts'
import { api } from '@/api'

// ===================================================================

export const ChatContext = createContext<ChatContextData>({} as ChatContextData)

const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  // =================================================================
  const socket = useSocket()
  const { userId } = useAuth()

  const [rooms, setRooms] = useState<Room[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [currentRoom, setCurrentRoom] = useState<number | null>(null)

  // =================================================================

  // useEffect(() => {
  //   const getRooms = async () => {
  //     try {
  //       const response = await api.get('/rooms')
  //       const data = response.data
  //       setRooms(data)
  //     } catch (error) {
  //       console.error('Erro ao buscar salas:', error)
  //     }
  //   }

  //   getRooms()

  //   socket.on('updateRooms', (updatedRooms) => {
  //     setRooms(updatedRooms)
  //   })

  //   return () => {
  //     socket.off('updateRooms')
  //   }
  // }, [])

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

    socket.on('newMesssage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage])
    })

    return () => {
      socket.off('updateRooms')
      socket.off('newMesssage')
    }
  }, [socket, userId])

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
    async (roomId: number) => {
      try {
        await entryRoom(socket, { roomId })
        setCurrentRoom(roomId)
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
          roomId: currentRoom,
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

  // useEffect(() => {
  //   console.log('SALAS ====>', rooms)
  // }, [rooms])

  useEffect(() => {
    console.log('SALA ATIVA ====>', currentRoom, messages)
  }, [currentRoom, messages])

  // =================================================================

  // useEffect(() => {
  //   console.log('LOGADO ======>', isAdminLogged, userId)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isAdminLogged])

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

function useChat(): ChatContextData {
  const context = useContext(ChatContext)

  if (!context) throw new Error('useChat must be used within a UserProvider')

  return context
}

export { ChatProvider, useChat }

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo } from 'react'

import io, { Socket } from 'socket.io-client'

import { useAuth } from '@/contexts/AuthContext'

import { ICreateRoom, IEntryRoom, ISendMessage } from '@/@types/socket'

export const useSocket = () => {
  const { isUserLogged } = useAuth()

  // Criação do socket apenas se o usuário estiver logado
  const socket = useMemo(() => {
    if (isUserLogged) {
      return io(import.meta.env.VITE_SERVER_URL)
    }
    return null
  }, [isUserLogged])

  return socket
}

export const sendMessage = async (
  socket: Socket<any, any> | null,
  { roomId, userId, message }: ISendMessage
) => {
  if (!socket) return

  await socket.emit('sendMessage', { roomId, userId, message })
}

export const entryRoom = async (
  socket: Socket<any, any> | null,
  { roomId }: IEntryRoom
) => {
  if (!socket) return

  await socket.emit('entryRoom', roomId)
}

export const createRoom = async (
  socket: Socket<any, any> | null,
  { roomName, createdBy }: ICreateRoom
) => {
  if (!socket) return

  await socket.emit('createRoom', { roomName, createdBy })
}

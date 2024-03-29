import io from 'socket.io-client'

import { ICreateRoom, IEntryRoom, ISendMessage } from '@/@types/socket'

const socket = io(import.meta.env.VITE_SERVER_URL)

export const sendMessage = async ({
  roomId,
  userId,
  message
}: ISendMessage) => {
  await socket.emit('sendMessage', { roomId, userId, message })
}

export const entryRoom = async ({ roomId }: IEntryRoom) => {
  await socket.emit('entryRoom', roomId)
}

export const createRoom = async ({ roomName, createdBy }: ICreateRoom) => {
  await socket.emit('createRoom', { roomName, createdBy })
}

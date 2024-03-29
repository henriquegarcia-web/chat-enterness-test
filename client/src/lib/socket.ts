import io from 'socket.io-client'

import { ICreateRoom, IEntryRoom, ISendMessage } from '@/@types/socket'

const socket = io(import.meta.env.VITE_SERVER_URL)

export const sendMessage = ({ roomId, userId, message }: ISendMessage) => {
  socket.emit('sendMessage', { roomId, userId, message })
}

export const entryRoom = ({ roomId }: IEntryRoom) => {
  socket.emit('entryRoom', roomId)
}

export const createRoom = ({ roomName, createdBy }: ICreateRoom) => {
  socket.emit('createRoom', { roomName, createdBy })
}

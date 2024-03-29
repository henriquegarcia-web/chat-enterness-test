// ================================================ AUTH CONTEXT

export interface IUserInfos {
  userId: string
  userNick: string
  userName: string
}

export interface IAuthContextData {
  userId: string | null
  userInfos: IUserInfos | null
  isUserLogged: boolean
  handleLogout: () => void
}

// ================================================ CHAT CONTEXT

export interface IRoom {
  roomId: number
  roomName: string
  createdByName: string
  createdAt: string
}

export interface IMessage {
  messageId: number
  messageContent: string
  messageSender: number
  messageSenderName: string
  messageRoom: number
  messageTimestamp: string
}

export interface IChatContextData {
  userId: string | null
  rooms: IRoom[]
  messages: IMessage[]
  currentRoom: IRoom | null
  handleCreateRoom: ({ roomName }: { roomName: string }) => Promise<boolean>
  handleEntryRoom: (room: IRoom) => Promise<void>
  handleSendMessage: (message: string) => Promise<boolean>
}

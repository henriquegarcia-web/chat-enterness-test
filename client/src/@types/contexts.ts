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

export interface Room {
  roomId: number
  roomName: string
}

export interface IMessage {
  messageId: number
  messageContent: string
  messageSender: number
  messageRoom: number
  messageTimestamp: string
}

export interface IChatContextData {
  userId: string | null
  rooms: Room[]
  messages: IMessage[]
  currentRoom: number | null
  handleCreateRoom: ({ roomName }: { roomName: string }) => Promise<boolean>
  handleEntryRoom: (roomId: number) => Promise<void>
  handleSendMessage: (message: string) => Promise<boolean>
}

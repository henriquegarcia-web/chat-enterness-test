// ================================================ AUTH CONTEXT

// ================================================ CHAT CONTEXT

export interface Room {
  roomId: number
  roomName: string
}

export interface Message {
  messageId: number
  messageContent: string
  messageSender: number
  messageRoom: number
  messageTimestamp: string
}

export interface ChatContextData {
  userId: string | null
  rooms: Room[]
  messages: Message[]
  currentRoom: number | null
  handleCreateRoom: ({ roomName }: { roomName: string }) => Promise<boolean>
  handleEntryRoom: (roomId: number) => Promise<void>
  handleSendMessage: (message: string) => Promise<void>
}

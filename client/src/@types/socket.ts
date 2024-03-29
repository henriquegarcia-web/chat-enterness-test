export interface ISendMessage {
  roomId: number
  userId: string
  message: string
}

export interface IEntryRoom {
  roomId: number
}

export interface ICreateRoom {
  roomName: string
  createdBy: string
}

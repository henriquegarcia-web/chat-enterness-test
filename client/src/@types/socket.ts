export interface ISendMessage {
  roomId: string
  userId: string
  message: string
}

export interface IEntryRoom {
  roomId: string
}

export interface ICreateRoom {
  roomName: string
  createdBy: string
}

export interface ISignupForm {
  userName: string
  userNick: string
  userPassword: string
  userPasswordConfirmation: string
}

export interface ISigninForm {
  userNick: string
  userPassword: string
}

export interface ICustomErrorAuth {
  response: {
    status: number
  }
}

export interface ICustomErrorAuthForm {
  message: string
}

export interface ICreateRoomForm {
  roomName: string
}

export interface ISubmitMessageForm {
  message: string
}

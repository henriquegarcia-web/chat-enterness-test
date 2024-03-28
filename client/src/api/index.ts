import axios from 'axios'

import { ISignupForm, ISigninForm } from '@/@types/api'

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

const handleSignup = async ({
  userName,
  userNick,
  userPassword
}: ISignupForm) => {
  const response = await api.post('/signup', {
    userName: userName,
    userNick: userNick,
    userPassword: userPassword
  })
  return response.data
}

const handleSignin = async ({ userNick, userPassword }: ISigninForm) => {
  const response = await api.post('/signin', {
    userNick: userNick,
    userPassword: userPassword
  })
  return response.data
}

export { handleSignup, handleSignin }

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
  try {
    const response = await api.post('/signup', {
      userName: userName,
      userNick: userNick,
      userPassword: userPassword
    })
    return response.data
  } catch (error) {
    console.error('Erro ao fazer login:', error)
    throw error
  }
}

const handleSignin = async ({ userNick, userPassword }: ISigninForm) => {
  try {
    const response = await api.post('/signin', {
      userName: userNick,
      userPassword: userPassword
    })
    return response.data
  } catch (error) {
    console.error('Erro ao fazer login:', error)
    throw error
  }
}

export { handleSignup, handleSignin }

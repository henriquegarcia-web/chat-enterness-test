import axios from 'axios'

import {
  throwSignupError,
  throwSigninError
} from '@/utils/functions/formatErrors'

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
      userName,
      userNick,
      userPassword
    })
    return response.data
  } catch (error: any) {
    const errorMessagem = throwSignupError(error.response.status)
    throw new Error(errorMessagem)
  }
}

const handleSignin = async ({ userNick, userPassword }: ISigninForm) => {
  try {
    const response = await api.post('/signin', { userNick, userPassword })
    return response.data
  } catch (error: any) {
    const errorMessagem = throwSigninError(error.response.status)
    throw new Error(errorMessagem)
  }
}

export { handleSignup, handleSignin }

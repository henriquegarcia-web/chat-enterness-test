import axios from 'axios'

import {
  throwSignupError,
  throwSigninError
} from '@/utils/functions/formatErrors'

import { ISignupForm, ISigninForm, ICustomErrorAuth } from '@/@types/api'

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
  } catch (error) {
    const customError = error as ICustomErrorAuth
    const errorMessagem = throwSignupError(customError.response.status)
    throw new Error(errorMessagem)
  }
}

const handleSignin = async ({ userNick, userPassword }: ISigninForm) => {
  try {
    const response = await api.post('/signin', { userNick, userPassword })
    return response.data
  } catch (error) {
    const customError = error as ICustomErrorAuth
    const errorMessagem = throwSigninError(customError.response.status)
    throw new Error(errorMessagem)
  }
}

export { handleSignup, handleSignin }

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import { Controller, useForm } from 'react-hook-form'

import { handleSignup } from '@/api'

import { ISignupForm } from '@/@types/api'
import { InputField } from '@/components'

const ChatISignupPage = () => {
  const navigate = useNavigate()

  const [signupIsLoading, setSignupIsLoading] = useState(false)

  const { control, handleSubmit, reset, formState } = useForm<ISignupForm>({
    defaultValues: { userNick: '', userPassword: '' }
  })

  const handleSignupForm = async (data: ISignupForm) => {
    setSignupIsLoading(true)

    try {
      const response = await handleSignup({
        userName: data.userName,
        userNick: data.userNick,
        userPassword: data.userPassword
      })
      const signupResponse = response.data

      setSignupIsLoading(false)

      if (signupResponse) {
        reset()
        navigate('/chat')
      } else {
        throw new Error('The search term does not exist.')
      }
    } catch (error) {
      console.error(error)
      setSignupIsLoading(false)
    }
  }

  return (
    <div className="window">
      <Card className="w-[350px] mx-8">
        <form onSubmit={handleSubmit(handleSignupForm)}>
          <CardHeader>
            <CardTitle>Criar conta</CardTitle>
            <CardDescription>
              Preencha os dados abaixo para cadastrar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Controller
                name="userName"
                control={control}
                rules={{
                  required: 'Este campo é obrigatório'
                }}
                render={({ field, fieldState: { error } }) => (
                  <InputField
                    label="Nome"
                    id="userName"
                    placeholder="Digite seu nome completo"
                    error={error}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="userNick"
                control={control}
                rules={{
                  required: 'Este campo é obrigatório'
                }}
                render={({ field, fieldState: { error } }) => (
                  <InputField
                    label="Usuário"
                    id="userNick"
                    placeholder="Digite seu ID de usuário"
                    error={error}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="userPassword"
                control={control}
                rules={{
                  required: 'Este campo é obrigatório'
                }}
                render={({ field, fieldState: { error } }) => (
                  <InputField
                    label="Senha"
                    id="userPassword"
                    placeholder="Digite sua senha"
                    error={error}
                    value={field.value}
                    onChange={field.onChange}
                    typePassword
                  />
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/entrar')}>
              Já tenho conta
            </Button>
            <Button type="submit">Cadastrar</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default ChatISignupPage

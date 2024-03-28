import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { InputField } from '@/components'
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

import { handleSignin } from '@/api'

import { ISigninForm } from '@/@types/api'

const ChatISigninPage = () => {
  const navigate = useNavigate()

  const [signinIsLoading, setSigninIsLoading] = useState(false)

  const { control, handleSubmit, reset, formState } = useForm<ISigninForm>({
    defaultValues: { userNick: '', userPassword: '' }
  })

  const handleSigninForm = async (data: ISigninForm) => {
    setSigninIsLoading(true)

    console.log(data)

    // try {
    //   const response = await handleSignin({
    //     userNick: data.userNick,
    //     userPassword: data.userPassword
    //   })
    //   const signinResponse = response.data

    //   setSigninIsLoading(false)

    //   if (signinResponse) {
    //     reset()
    //     navigate('/chat')
    //   } else {
    //     throw new Error('The search term does not exist.')
    //   }
    // } catch (error) {
    //   console.error(error)
    //   setSigninIsLoading(false)
    // }
  }

  return (
    <div className="window">
      <Card className="w-[350px] mx-8">
        <form onSubmit={handleSubmit(handleSigninForm)}>
          <CardHeader>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>
              Digite seu usuário e senha para entrar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
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
            <Button variant="outline" onClick={() => navigate('/cadastrar')}>
              Não tenho cadastro
            </Button>
            <Button type="submit">Entrar</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default ChatISigninPage
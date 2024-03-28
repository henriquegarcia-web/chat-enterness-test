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
import { useToast } from '@/components/ui/use-toast'

import { useForm } from 'react-hook-form'

import { handleSignup } from '@/api'

import { ISignupForm } from '@/@types/api'
import { InputField } from '@/components'

const ChatISignupPage = () => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const [signupIsLoading, setSignupIsLoading] = useState(false)

  const { control, handleSubmit, reset, formState } = useForm<ISignupForm>({
    defaultValues: { userName: '', userNick: '', userPassword: '' }
  })

  const { isValid } = formState

  const handleSignupForm = async (data: ISignupForm) => {
    setSignupIsLoading(true)

    const response = await handleSignup({
      userName: data.userName,
      userNick: data.userNick,
      userPassword: data.userPassword
    })

    const signupResponse = response.successful

    setSignupIsLoading(false)

    if (signupResponse) {
      reset()
      // navigate('/chat')
      toast({
        title: 'Sucesso',
        description: response.msg
      })
    } else {
      toast({
        title: 'Falha',
        description: response.msg
      })
    }

    setSignupIsLoading(false)
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
              <InputField
                label="Nome"
                id="userName"
                placeholder="Digite seu nome completo"
                control={control}
              />
              <InputField
                label="Usuário"
                id="userNick"
                placeholder="Digite seu ID de usuário"
                control={control}
              />
              <InputField
                label="Senha"
                id="userPassword"
                placeholder="Digite sua senha"
                control={control}
                typePassword
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/entrar')}>
              Já tenho conta
            </Button>
            <Button type="submit" disabled={!isValid || signupIsLoading}>
              Cadastrar
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default ChatISignupPage

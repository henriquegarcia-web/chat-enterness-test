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

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { handleSignup } from '@/api'

import { ICustomErrorAuthForm, ISignupForm } from '@/@types/api'
import { InputField } from '@/components'

const signupSchema = Yup.object().shape({
  userName: Yup.string()
    .required()
    .max(30, 'O nome não pode ter mais de 30 dígitos'),
  userNick: Yup.string()
    .required()
    .max(20, 'O usuário não pode ter mais de 20 dígitos'),
  userPassword: Yup.string()
    .required()
    .max(20, 'A senha não pode ter mais de 20 dígitos'),
  userPasswordConfirmation: Yup.string()
    .required()
    .oneOf([Yup.ref('userPassword')], 'As senhas precisam ser iguais')
})

const ChatISignupPage = () => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const [signupIsLoading, setSignupIsLoading] = useState(false)

  const { control, handleSubmit, reset, formState } = useForm<ISignupForm>({
    defaultValues: {
      userName: '',
      userNick: '',
      userPassword: '',
      userPasswordConfirmation: ''
    },
    mode: 'onChange',
    resolver: yupResolver(signupSchema)
  })

  const { isValid } = formState

  const handleSignupForm = async (data: ISignupForm) => {
    setSignupIsLoading(true)

    try {
      const response = await handleSignup(data)

      if (response.success) {
        navigate('/chat')
        localStorage.setItem('user_token', response.token)
        window.location.reload()
        reset()
      }

      toast({
        title: response.success ? 'Sucesso' : 'Falha',
        description: response.msg
      })
    } catch (error) {
      const customError = error as ICustomErrorAuthForm
      toast({
        title: 'Falha',
        description: customError.message
      })
    } finally {
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
              <InputField
                label="Confirmar senha"
                id="userPasswordConfirmation"
                placeholder="Digite novamente sua senha"
                control={control}
                typePassword
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/entrar')}
            >
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

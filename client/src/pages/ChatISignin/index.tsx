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
import { useToast } from '@/components/ui/use-toast'

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { handleSignin } from '@/api'

import { ICustomErrorAuthForm, ISigninForm } from '@/@types/api'

const signinSchema = Yup.object().shape({
  userNick: Yup.string().required(),
  userPassword: Yup.string().required()
})

const ChatISigninPage = () => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const [signinIsLoading, setSigninIsLoading] = useState(false)

  const { control, handleSubmit, reset, formState } = useForm<ISigninForm>({
    defaultValues: { userNick: '', userPassword: '' },
    mode: 'onBlur',
    resolver: yupResolver(signinSchema)
  })

  const { isValid } = formState

  const handleSigninForm = async (data: ISigninForm) => {
    setSigninIsLoading(true)

    try {
      const response = await handleSignin(data)

      if (response.success) {
        // navigate('/chat')
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
      setSigninIsLoading(false)
    }
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
            <Button variant="outline" onClick={() => navigate('/cadastrar')}>
              Não tenho cadastro
            </Button>
            <Button type="submit" disabled={!isValid || signinIsLoading}>
              Entrar
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default ChatISigninPage

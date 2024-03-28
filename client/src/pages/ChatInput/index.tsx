import { useNavigate } from 'react-router-dom'

import * as S from './styles'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const ChatInputPage = () => {
  const navigate = useNavigate()

  return (
    <S.ChatInputPage>
      <Card className="w-[350px] mx-8">
        <CardHeader>
          <CardTitle>Entrar no chat</CardTitle>
          <CardDescription>
            Digite seu nome e usuário para entrar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Nome e sobrenome" />
              </div>
            </div>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="user">Usuário</Label>
                <Input id="user" placeholder="ID de usuário" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate('/')}>
            Voltar
          </Button>
          <Button>Entrar</Button>
        </CardFooter>
      </Card>
    </S.ChatInputPage>
  )
}

export default ChatInputPage

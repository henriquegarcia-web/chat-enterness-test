import { useNavigate } from 'react-router-dom'

import * as S from './styles'

import { Logo } from '@/components'
import { Button } from '@/components/ui/button'

const ChatLanding = () => {
  const navigate = useNavigate()

  return (
    <S.ChatLanding>
      <S.ChatLandingContainer>
        <Logo />
        <S.ChatLandingContainerLegend>
          Conecte-se instantaneamente e <b>converse em tempo real</b> com seus
          amigos e colegas!
        </S.ChatLandingContainerLegend>
        <Button onClick={() => navigate('/entrar')}>Entrar</Button>
      </S.ChatLandingContainer>
    </S.ChatLanding>
  )
}

export default ChatLanding

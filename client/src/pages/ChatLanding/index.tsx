import { useNavigate } from 'react-router-dom'

import { Logo } from '@/components'
import { Button } from '@/components/ui/button'

const ChatLandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="window">
      <div className="">
        <Logo />
        <h2>
          Conecte-se instantaneamente e <b>converse em tempo real</b> com seus
          amigos e colegas!
        </h2>
        <Button onClick={() => navigate('/entrar')}>Entrar</Button>
      </div>
    </div>
  )
}

export default ChatLandingPage

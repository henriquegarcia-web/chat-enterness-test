import { useNavigate } from 'react-router-dom'

import { Logo } from '@/components'
import { Button } from '@/components/ui/button'

const ChatLandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="window">
      <div className="flex flex-col gap-3 items-center max-w-[480px] mx-8">
        <Logo />
        <h2 className="font-light text-center mb-5">
          Conecte-se instantaneamente e <b>converse em tempo real</b> com seus
          amigos e colegas!
        </h2>
        <Button onClick={() => navigate('/entrar')}>Acessar</Button>
      </div>
    </div>
  )
}

export default ChatLandingPage

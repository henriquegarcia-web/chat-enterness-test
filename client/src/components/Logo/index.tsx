import * as S from './styles'
import { PiChatsCircleLight } from 'react-icons/pi'

interface ILogo {
  size?: number
}

const Logo = ({ size }: ILogo) => {
  return (
    <S.Logo size={size}>
      Realtime
      <PiChatsCircleLight />
      <b>Chat</b>
    </S.Logo>
  )
}

export default Logo

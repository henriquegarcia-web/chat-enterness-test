import { PiChatsCircleLight } from 'react-icons/pi'

import { TypeText } from '@/@types/fonts'

interface ILogo {
  size?: TypeText
  iconSize?: TypeText
}

const Logo = ({ size, iconSize }: ILogo) => {
  const logoSizeClasses = size
    ? `text-${size} font-light`
    : 'text-3xl font-light'
  const iconSizeClasses = iconSize ? `text-${iconSize}` : 'text-4xl'

  console.log(size)

  return (
    <h1 className={`flex items-center gap-1 ${logoSizeClasses}`}>
      Realtime
      <PiChatsCircleLight className={`mb-1 ${iconSizeClasses}`} />
      <b className="font-medium">Chat</b>
    </h1>
  )
}

export default Logo

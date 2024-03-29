import { PiChatsCircleLight } from 'react-icons/pi'

interface ILogo {
  minify?: boolean
}

const Logo = ({ minify = false }: ILogo) => {
  const logoSizeClasses = minify ? 'text-lg leading-10' : 'text-4xl leading-6'
  const iconSizeClasses = minify ? 'text-3xl' : 'text-5xl'

  return (
    <div className="flex items-center gap-2">
      <PiChatsCircleLight className={`font-light ${iconSizeClasses}`} />
      <h1 className={logoSizeClasses}>
        Realtime
        <b className="font-medium">Chat</b>
      </h1>
    </div>
  )
}

export default Logo

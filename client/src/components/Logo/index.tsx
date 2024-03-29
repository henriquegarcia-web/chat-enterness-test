import { PiChatsCircleLight } from 'react-icons/pi'

interface ILogo {
  minify?: boolean
}

const Logo = ({ minify = false }: ILogo) => {
  const logoSizeClasses = minify ? 'text-xl' : 'text-4xl'
  const iconSizeClasses = minify ? 'text-3xl' : 'text-5xl'

  return (
    <div className="flex items-center gap-2">
      <PiChatsCircleLight
        className={`font-light leading-6 ${iconSizeClasses}`}
      />
      <h1 className={logoSizeClasses}>
        Realtime
        <b className="font-medium">Chat</b>
      </h1>
    </div>
  )
}

export default Logo

import { IMessage } from '@/@types/contexts'

interface IChatWrapper {
  messages: IMessage[]
  activeUser?: string
}

const ChatWrapper = ({ messages, activeUser }: IChatWrapper) => {
  const formatTimestamp = (timestamp: string): string => {
    return new Date(timestamp).toLocaleTimeString()
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col items-start space-y-2">
        {messages.map((message) => (
          <div
            key={message.messageId}
            className={`${
              message.messageSender.toString() === activeUser?.toString()
                ? 'bg-gray-200 self-start'
                : 'bg-blue-300 self-end'
            } rounded-lg p-2 max-w-xs`}
          >
            <p className="text-sm">{message.messageContent}</p>
            <p className="text-xs text-gray-500">
              {formatTimestamp(message.messageTimestamp)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatWrapper

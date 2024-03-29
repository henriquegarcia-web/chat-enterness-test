import { IMessage } from '@/@types/contexts'

interface IChatWrapper {
  messages: IMessage[]
  activeUser?: string
}

const ChatWrapper = ({ messages, activeUser }: IChatWrapper) => {
  const formatTimestamp = (timestamp: string): string => {
    return new Date(timestamp).toLocaleTimeString()
  }

  const groupMessagesByDay = (
    messages: IMessage[]
  ): { [key: string]: IMessage[] } => {
    const groupedMessages: { [key: string]: IMessage[] } = {}

    messages.forEach((message) => {
      const messageDate = new Date(
        message.messageTimestamp
      ).toLocaleDateString()
      if (!groupedMessages[messageDate]) {
        groupedMessages[messageDate] = []
      }
      groupedMessages[messageDate].push(message)
    })

    return groupedMessages
  }

  const groupedMessages = groupMessagesByDay(messages)

  const today = new Date().toLocaleDateString()

  return (
    <div className="flex flex-col flex-1 flex-col-reverse h-full overflow-auto pr-3">
      {Object.keys(groupedMessages).map((date) => (
        <div key={date} className="flex flex-col items-start h-auto space-y-2">
          <p className="text-xs font-medium tracking-[1px] mx-auto py-2">
            {date === today ? 'Hoje' : date}
          </p>
          {groupedMessages[date].map((message) => {
            const isFromCurrentUser =
              message.messageSender.toString() === activeUser?.toString()

            return (
              <div
                key={message.messageId}
                className={`${
                  !isFromCurrentUser
                    ? 'bg-gray-200 self-start'
                    : 'bg-blue-300 self-end'
                } flex flex-col items-end gap-y-1 rounded-lg p-2 max-w-xs`}
              >
                <p className="text-sm text-black font-semibold">
                  {message.messageContent}
                </p>
                <p className="text-xs text-gray-500 font-semibold">
                  {formatTimestamp(message.messageTimestamp)}
                </p>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default ChatWrapper

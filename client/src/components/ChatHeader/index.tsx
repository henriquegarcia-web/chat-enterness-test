import { timestampToCreationDay } from '@/utils/functions/convertTimestamp'

import { IRoom } from '@/@types/contexts'

interface IChatHeader {
  currentRoom?: IRoom
}

const ChatHeader = ({ currentRoom }: IChatHeader) => {
  return (
    <div className="flex content-center flex-col gap-y-1">
      <h1 className="text-xl font-semibold">{currentRoom?.roomName}</h1>
      <p className="text-xs font-light text-gray-400">
        Sala criada por{' '}
        <b className="font-semibold">{currentRoom?.createdByName}</b> em{' '}
        <b className="font-semibold">
          {timestampToCreationDay(currentRoom?.createdAt || '')}
        </b>
      </p>
    </div>
  )
}

export default ChatHeader

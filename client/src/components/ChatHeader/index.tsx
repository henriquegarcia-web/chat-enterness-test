import { useState } from 'react'

import { Button } from '@/components/ui/button'

import { timestampToCreationDay } from '@/utils/functions/convertTimestamp'

import { useAuth } from '@/contexts/AuthContext'
import { useChat } from '@/contexts/ChatContext'

interface IChatHeader {}

const ChatHeader = ({}: IChatHeader) => {
  const { userInfos } = useAuth()
  const { handleDeleteRoom, currentRoom } = useChat()

  const [deleteRoomIsLoading, setDeleteRoomIsLoading] = useState(false)

  const deleteRoom = async () => {
    setDeleteRoomIsLoading(false)
    await handleDeleteRoom()
    setDeleteRoomIsLoading(false)
  }

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex justify-center flex-col gap-y-1">
        <h1 className="text-xl font-semibold">{currentRoom?.roomName}</h1>
        <p className="text-xs font-light text-gray-400">
          Sala criada por{' '}
          <b className="font-semibold">{currentRoom?.createdByName}</b> em{' '}
          <b className="font-semibold">
            {timestampToCreationDay(currentRoom?.createdAt || '')}
          </b>
        </p>
      </div>
      {userInfos?.userId.toString() === currentRoom?.createdBy.toString() && (
        <Button onClick={deleteRoom} disabled={deleteRoomIsLoading}>
          Deletar
        </Button>
      )}
    </div>
  )
}

export default ChatHeader

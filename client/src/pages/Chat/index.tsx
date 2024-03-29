import { Menu, MessagesSquare } from 'lucide-react'

import {
  ChatInputField,
  ChatWrapper,
  CreateRoomDialog,
  Logo,
  NotSelectedChat,
  UserDropdown
} from '@/components'
import { Button } from '@/components/ui/button'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { useChat } from '@/contexts/ChatContext'
import { useAuth } from '@/contexts/AuthContext'

const ChatPage = () => {
  const { userInfos } = useAuth()
  const { handleEntryRoom, currentRoom, rooms, messages } = useChat()

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4">
            <Logo minify />
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium">
              <ul>
                <li className="mb-2">
                  <CreateRoomDialog />
                </li>

                {rooms.map((room) => {
                  const isRoomActive = currentRoom?.roomId === room.roomId
                  const roomLinkClass = isRoomActive ? 'bg-muted' : ''

                  return (
                    <li
                      key={`room-${room.roomId}`}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:cursor-pointer active:bg-muted ${roomLinkClass}`}
                      onClick={() => handleEntryRoom(room)}
                    >
                      <MessagesSquare className="h-4 w-4" />
                      {room.roomName}
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-screen">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            {/* @ts-ignore */}
            <SheetContent side="left" className="flex flex-col">
              <nav>
                <ul className="flex flex-col">
                  <li className="py-5">
                    <CreateRoomDialog />
                  </li>
                  <ul className="flex flex-col gap-y-2">
                    {rooms.map((room) => {
                      const isRoomActive = currentRoom?.roomId === room.roomId
                      const roomLinkClass = isRoomActive ? 'bg-muted' : ''

                      return (
                        <li
                          key={`room-${room.roomId}`}
                          className={`flex items-center gap-4 rounded-xl px-3 py-2 text-foreground hover:text-foreground active:bg-muted ${roomLinkClass}`}
                          onClick={() => handleEntryRoom(room)}
                        >
                          <MessagesSquare className="h-4 w-4" />
                          {room.roomName}
                        </li>
                      )
                    })}
                  </ul>
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1"></div>
          <UserDropdown />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 h-[calc(100%-60px)]">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">
              {currentRoom?.roomName}
            </h1>
          </div>
          {currentRoom ? (
            <div className="flex flex-1 items-end p-4 rounded-lg border border-dashed shadow-sm h-[calc(100%-100px)]">
              <ChatWrapper messages={messages} activeUser={userInfos?.userId} />
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
              <NotSelectedChat />
            </div>
          )}
          <ChatInputField />
        </main>
      </div>
    </div>
  )
}

export default ChatPage
